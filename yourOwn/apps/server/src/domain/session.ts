export type SessionId = string;
export type UserId = string | null;

export type ExperianceEntrys = string;
export type TemplateVariantId = string;

export enum SessionStatus {
    Active = "active",
    Paused = "paused",
    Completed = "completed"
}

export interface Session{
    id: SessionId,
    userId: UserId,
    status: SessionStatus,
    startedAt: Date | null,
    completedAt: Date | null,
    lastSavedAt: Date| null
}