import { JsonArray } from "@prisma/client/runtime/library";
import { prisma } from "../lib/prisma"


export async function upsertProfile(sessionId: string, data: any) {
  return await prisma.profile.upsert({
    where: {
      sessionId: sessionId, // Defined as unique in schema 
    },
    update: {
      displayName: data.displayName,
      headline: data.headline,
      location: data.location,
      bio: data.bio,
      skills: data.skills, // String[] @db.Text [cite: 9]
      links: data.links || {}, // Json [cite: 9]
      avatarUrl: data.avatarUrl,
    },
    create: {
      sessionId: sessionId,
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

export async function fetUserProfileSummary(userId: string) {
  return await prisma.profile.findMany({
    where: {
      userId: userId
    },
    select: {
      id:true,
      displayName: true, // add more later
      avatarUrl: true, 
    }
  })
}

export async function getFullProfileById(profileId: string ) {
  return await prisma.profile.findUnique({
    where: {
      id: profileId
    }
  })
}