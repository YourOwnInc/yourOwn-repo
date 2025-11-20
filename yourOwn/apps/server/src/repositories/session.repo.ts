import { prisma } from "../lib/prisma";

export interface SessionRow {
  id: string;
  createdAt: Date;
  claimedByUserId?: string | null;
  metadata?: unknown | null;
}


/* Creates an empty row and returns the UUID created at endpoint*/
export async function createSession(){
return prisma.session.create({ data: {}})
}

export async function getSession(id: string): Promise<SessionRow | null> {
  return prisma.session.findUnique({ where: { id } });
}

export async function listSessions() {
  const list = await prisma.user.findMany();
  return list;
}
export async function claimSession(opts: { sessionId: string; userId: string }): Promise<void> {
  await prisma.session.update({
    where: { id: opts.sessionId },
    data: { claimedByUserId: opts.userId },
  });
}
