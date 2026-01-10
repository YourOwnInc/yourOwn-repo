// services/layout.auth.service.ts
import { prisma } from "../lib/prisma";

export async function verifyLayoutOwnership(layoutId: string, authUser: { role: string; sessionId?: string; userId?: string }) {
  const layout = await prisma.layout.findUnique({
    where: { id: layoutId },
    select: { 
      sessionId: true, 
      session: { 
        select: { claimedByUserId: true } 
      } 
    }
  });

  if (!layout) {
    throw new Error("NOT_FOUND");
  }

  if (authUser.role === 'GUEST') {
    // Guest must match the exact sessionId in the JWT
    if (layout.sessionId !== authUser.sessionId) {
      throw new Error("FORBIDDEN");
    }
  } else {
    // Registered user must match the owner of the session
    if (layout.session.claimedByUserId !== authUser.userId) {
      throw new Error("FORBIDDEN");
    }
  }

  return layout;
}