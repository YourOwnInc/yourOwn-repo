// src/repositories/session.repo.ts
import { Session, SessionId, UserId, SessionStatus } from "../domain/session";

export interface SessionRepo {
  create(params: {
    userId: UserId;
    startedAt: Date;
  }): Promise<Session>;

  update(id: SessionId, patch: Partial<Omit<Session, "id" | "startedAt">>): Promise<Session>;

  findById(id: SessionId): Promise<Session | null>;

  linkToUser(id: SessionId, userId: string): Promise<Session>;

  complete(id: SessionId, completedAt: Date): Promise<Session>;

  // optional helper
  countEntries(id: SessionId): Promise<number>;
}
