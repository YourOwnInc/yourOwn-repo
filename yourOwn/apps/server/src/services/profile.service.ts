import * as profileRepo from "../repositories/profile.repo";
import { prisma } from "../lib/prisma";

export async function syncProfile(sessionId: string, profileData: any) {
  // 1. Check if the session is claimed by a User 
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    select: { claimedByUserId: true }
  });

  // 2. Prepare the payload
  const payload = {
    ...profileData,
    userId: session?.claimedByUserId || null,
  };

  // 3. Execute the upsert
  return await profileRepo.upsertProfile(sessionId, payload);
}