import * as profileService from "../services/profile.service";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";

export async function handleProfileUpdate(req: Request, res: Response) {
    const authReq = req as AuthenticatedRequest;
    const {sessionId, role } = authReq.user;

    try {
        

        // Destructuring and renaming 'locaiton' to the correct schema 'location' [cite: 8]
        const { displayName, headline, location, bio, skills, links, avatarUrl } = req.body;
        
        const profileContent = { 
            displayName, 
            headline, 
            location, // Handling the typo from the client-side temporarily
            bio, 
            skills, 
            links,
            avatarUrl 
        };

        const updatedProfile = await profileService.syncProfile(sessionId, profileContent);

        return res.json(updatedProfile);
    }   
    catch (error) {
        console.error("Profile update error:", error);
        return res.status(500).json({ error: "Failed to update profile" });
    }
}

export async function fetchProfile(req: Request, res: Response ) {
    const authReq = req as AuthenticatedRequest;
    const {sessionId} = authReq.user;
    try {
        
    }
}