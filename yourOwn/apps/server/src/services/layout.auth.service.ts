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

export async function verifyLayoutNameOwnership(
  layoutName: string, 
  authUser: { role: string; sessionId?: string; userId?: string }
) {
  // Find the layout using the composite keys
  // We use findFirst or findUnique depending on how sessionId is indexed
  const layout = await prisma.layout.findFirst({
    where: {
      LayoutId: layoutName,
      session: authUser.role === 'GUEST' 
        ? { id: authUser.sessionId } 
        : { claimedByUserId: authUser.userId }
    },
    select: { id: true, sessionId: true }
  });

  if (!layout) {
    throw new Error("FORBIDDEN"); // Or NOT_FOUND if you want to be specific
  }

  return layout; // Returns the full object including the real UUID
}