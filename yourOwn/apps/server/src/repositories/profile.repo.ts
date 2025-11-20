import { JsonArray } from "@prisma/client/runtime/library";
import {prisma } from "../lib/prisma"

export type CreateProfileInput = {
    displayName: string;
    headline: string;
    location: string;
    bio: string;
    skills: String[];
    links: JsonArray;
}

// create profile 

export async function createProfile(sessionId: string | undefined, input: CreateProfileInput ) {

    // 
}