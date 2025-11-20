import { setTraceSigInt } from "util";
import * as profileRepo from "../repositories/profile.repo"
import { Request, Response } from "express";
export async function createProfile(req: Request, res: Response) {
    try{
        const sessionId = req.header("X-Session-Id");
        const { displayName, headline, locaiton, bio, skills, links} = req.body;
        const profileContent = { displayName, headline, locaiton, bio, skills, links} 
        const newProfile = await profileRepo.createProfile(sessionId, req.body );

        return res.json(newProfile);
    }   
    catch(error){

    }
    
}