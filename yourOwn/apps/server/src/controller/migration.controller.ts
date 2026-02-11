import { Request, Response, NextFunction } from "express";
import { JwtEngine } from "../lib/auth/jwt.engine";
import * as repo from "../repositories/session.repo";

/**
 * Migration Controller
 * Handles recovering sessions from old tokens when the JWT secret has changed.
 */
export async function migrateSession(req: Request, res: Response, next: NextFunction) {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ error: "Missing token in request body" });
    }

    try {
        // 1. Extract payload without verification (emergency recovery)
        let payload: any;
        try {
            payload = JwtEngine.decodeUnverified(token);
            console.log("[Migration] Decoded payload candidate:", payload);
        } catch (e) {
            console.error("[Migration] Decode failed:", e);
            return res.status(400).json({ error: "Invalid token format or structure" });
        }

        const sessionId = payload.sessionId;
        if (!sessionId) {
            console.error("[Migration] No sessionId found in decoded payload. Keys:", Object.keys(payload));
            return res.status(400).json({ error: "Could not identify sessionId in token" });
        }

        // 2. Verify the sessionId exists in our database
        const session = await repo.getSession(sessionId);
        if (!session) {
            console.warn(`[Migration] Attempted recovery of non-existent session: ${sessionId}`);
            return res.status(404).json({ error: "Session not found in database. Please check if you have the correct old token." });
        }

        // 3. Optional: Add more checks (e.g., if session is already claimed by another user)
        // For now, we trust the DB record if it matches the payload.

        // 4. Issue a NEW token signed with the CURRENT secret
        const newToken = JwtEngine.sign({
            sub: session.id,
            sessionId: session.id,
            userId: session.claimedByUserId || undefined,
            role: payload.role || 'GUEST'
        });

        console.log(`[Migration] Successfully migrated session ${session.id} to new secret`);

        return res.json({
            token: newToken,
            sessionId: session.id,
            message: "Session migrated successfully"
        });

    } catch (err) {
        console.error("[Migration] Error during session migration:", err);
        next(err);
    }
}
