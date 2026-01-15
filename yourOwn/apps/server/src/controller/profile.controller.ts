import * as profileService from "../services/profile.service";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";

import * as profileRepo from "../repositories/profile.repo";


export async function handleProfileUpdate(req: Request, res: Response) {
    const authReq = req as AuthenticatedRequest;
    const {sessionId, role } = authReq.user;

    try {
        

        // Destructuring and renaming 'locaiton' to the correct schema 'location' [cite: 8]
        const { displayName, headline, location, bio, skills, links, avatarUrl } = req.body;
        const { profileId} = req.params;
        
        const profileContent = { 
            displayName, 
            headline, 
            location, // Handling the typo from the client-side temporarily
            bio, 
            skills, 
            links,
            avatarUrl 
        };

        const updatedProfile = await profileService.syncProfile(profileId, profileContent);

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



// GET /api/profiles
export async function handleGetSummaries(req: Request, res: Response) {
    const { sessionId } = (req as AuthenticatedRequest).user;
    try {
        const summaries = await profileRepo.getProfileSummary(sessionId);
        return res.json(summaries);
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch summaries" });
    }
}

// GET /api/profiles/:id
export async function handleGetProfileDetail(req: Request, res: Response) {
    const { profileId } = req.params;
    try {
        const profile = await profileRepo.getFullProfileById(id);
        if (!profile) return res.status(404).json({ error: "Profile not found" });
        return res.json(profile);
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch profile" });
    }
}


// PUT /api/profiles/:id/links
export async function handleUpsertLink(req: Request, res: Response) {
    const { id } = req.params;
    const newLink = req.body; // { id?, platform, url, label }

    try {
        const profile = await profileRepo.getFullProfileById(id);
        if (!profile) return res.status(404).json({ error: "Profile not found" });

        // Logic to update the JSON links array
        let currentLinks = Array.isArray(profile.links) ? [...profile.links] : [];
        
        if (newLink.id) {
            // Update existing link
            currentLinks = currentLinks.map(l => l.id === newLink.id ? { ...l, ...newLink } : l);
        } else {
            // Add new link with a generated ID if missing
            currentLinks.push({ ...newLink, id: crypto.randomUUID() });
        }

        const updated = await profileRepo.updateProfileLinks(id, currentLinks);
        return res.json(updated);
    } catch (error) {
        return res.status(500).json({ error: "Failed to update links" });
    }
}