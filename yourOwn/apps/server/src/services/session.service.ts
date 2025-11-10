import * as repo from "../repositories/session.repo";

export interface SessionDTO {
  id: string;
  createdAt: string;
  claimedByUserId?: string | null;
  metadata?: unknown | null;
}

const toDTO = (r: repo.SessionRow): SessionDTO => ({
  id: r.id,
  createdAt: r.createdAt.toISOString(),
});

export async function startSession(){
  const row = await repo.createSession();
  return{
    id: row.id,
    createdAt: row.createdAt.toISOString(),
  }
}

export async function readSession(id: string): Promise<SessionDTO | null> {
  const row = await repo.getSession(id);
  return row ? toDTO(row) : null;
}

export async function claimSession(sessionId: string, userId: string): Promise<void> {
  // validate both are UUIDs if columns are @db.Uuid
  await repo.claimSession({ sessionId, userId });
}
