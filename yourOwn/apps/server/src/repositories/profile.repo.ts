import { JsonArray } from "@prisma/client/runtime/library";
import { prisma } from "../lib/prisma"
import { ProfileBody } from "../schemas/profile.schema";


/**
 * Upserts a profile based on its unique internal ID.
 * If no ID is provided, it creates a new profile associated with the session.
 */
export async function upsertProfile(data: any, profileId?: string) {
  return await prisma.profile.upsert({
    where: {
      id: profileId || '00000000-0000-0000-0000-000000000000', // A non-existent UUID to trigger 'create' if profileId is undefined
    },
    update: {
      displayName: data.displayName,
      headline: data.headline,
      location: data.location,
      bio: data.bio,
      skills: data.skills,
      links: data.links || {},
      avatarUrl: data.avatarUrl,
    },
    create: {
      // If creating, we must have a sessionId or userId to own this profile
      sessionId: data.sessionId, 
      displayName: data.displayName,
      headline: data.headline,
      location: data.location,
      bio: data.bio,
      skills: data.skills || [],
      links: data.links || {},
      avatarUrl: data.avatarUrl,
    },
  });
}
/**
 * Creates a profile. 
 * Note: Use the spread operator to pass all schema fields directly to Prisma.
 */
export async function createProfile(sessionId: string, data: ProfileBody) {
  return await prisma.profile.create({
    data: {
      ...data, // Spreads displayName, bioLong, philosophy, etc.
      sessionId: sessionId,
    },
  });
}

/**
 * Updates an existing profile using its ID.
 */
export async function updateProfile(profileId: string, data: Partial<ProfileBody>) {
  return await prisma.profile.update({
    where: { id: profileId },
    data: data, // Prisma handles the partial update automatically
  });
}

export async function getProfileSummary(sessionId: string) {
  return await prisma.profile.findMany({
    where: {
      sessionId: sessionId
    },
    select: {
      id:true,
      displayName: true, // add more later
      avatarUrl: true, 
    }
  })
}

/**
 * Updates the 'links' JSON field specifically.
 */
export async function updateProfileLinks(profileId: string, links: any) {
  return await prisma.profile.update({
    where: { id: profileId },
    data: {
      links: links || {}, //
    },
  });
}

export async function getFullProfileById(profileId: string ) {
  return await prisma.profile.findUnique({
    where: {
      id: profileId
    }
  })
}