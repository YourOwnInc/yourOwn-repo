// src/repositories/session.repo.ts
import { $ZodNullParams } from "zod/v4/core";
import { Session, SessionId, UserId, SessionStatus } from "../domain/session";


export type SessionUpdate = Partial<Pick<Session, "status" | "userId">>;

export interface SessionRepo {
  create(params: {
    userId: UserId;
    metadata: any;
    startedAt: Date;
    updatedAt: Date;
  }): Promise<Session>;

  update(id: SessionId, patch: SessionUpdate): Promise<Session>;

  findById(id: SessionId): Promise<Session | null>;

  linkToUser(id: SessionId, userId: string): Promise<Session>;

  complete(id: SessionId, completedAt: Date): Promise<Session>;

  // optional helper
  countEntries(id: SessionId): Promise<number>;
}
