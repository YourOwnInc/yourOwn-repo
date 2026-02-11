import jwt from 'jsonwebtoken';
import { z } from 'zod';



const SECRET = process.env.JWT_SECRET || 'dev-secret-change-me ';
const FALLBACK_SECRET = process.env.JWT_SECRET_FALLBACK;


// Validate paylod schema 

export const JwtPayloadSchema = z.object({
    sub: z.string().uuid(),
    sessionId: z.string().uuid(),
    userId: z.string().uuid().optional(), // place holder for 3rd service auth id ( goodgle , github, etc)
    email: z.string().email().optional(),
    role: z.enum(['GUEST', 'USER', 'ADMIN'])
});
export type JwtPayload = z.infer<typeof JwtPayloadSchema>;




export class JwtEngine {
    // Function to Create the JWT token 
    static sign(payload: JwtPayload): string {
        return jwt.sign(payload, SECRET, { algorithm: 'HS256' });
    }

    // function to Verify the JWT token
    static verify(token: string): JwtPayload {
        try {
            const decoded = jwt.verify(token, SECRET, { algorithms: ['HS256'] });
            return JwtPayloadSchema.parse(decoded);
        } catch (error) {
            // If primary secret fails, try fallback secret if configured
            if (FALLBACK_SECRET) {
                try {
                    console.log('[Auth] Primary secret failed, trying fallback secret');
                    const decoded = jwt.verify(token, FALLBACK_SECRET, { algorithms: ['HS256'] });
                    return JwtPayloadSchema.parse(decoded);
                } catch (fallbackError) {
                    console.error('[Auth] Fallback secret verification also failed');
                    throw fallbackError;
                }
            }
            throw error;
        }
    }

    /**
     * Emergency method to extract payload without signature verification.
     * Use ONLY for migration/recovery when secret is lost.
     * Lenient: Attempts to find sessionId in various fields.
     */
    static decodeUnverified(token: string): Partial<JwtPayload> {
        const decoded = jwt.decode(token);
        if (!decoded || typeof decoded === 'string') throw new Error('Could not decode token');

        // Extract possible session ID candidates
        const sub = (decoded as any).sub;
        const sessionId = (decoded as any).sessionId || (decoded as any).id || sub;
        const role = (decoded as any).role || 'GUEST';
        const userId = (decoded as any).userId;

        return {
            sub,
            sessionId,
            role: role as any,
            userId
        };
    }
}

