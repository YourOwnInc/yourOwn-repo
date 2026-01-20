import * as profileRepo from "../repositories/profile.repo";
import { prisma } from "../lib/prisma";
import { ProfileBody } from "../schemas/profile.schema";

export async function syncProfile(profileId: string, profileData: ProfileBody) {
  // 1. Check if the session is claimed by a User 
  const session = await prisma.session.findUnique({
    where: { id: profileId },
    select: { claimedByUserId: true }
  });

  // 2. Prepare the payload
  const payload = {
    ...profileData,
    userId: session?.claimedByUserId || null,
  };

  // 3. Execute the upsert
  return await profileRepo.updateProfile(profileId, payload);
}