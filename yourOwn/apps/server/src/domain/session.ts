export type SessionId = string;
export type UserId = string;

export type ExperianceEntryId = string;
export type TemplateVariantId = string;

export enum SessionStatus {
    Active = 'active',
    Paused = 'paused',
    Completed = 'completed'

}

export interface Session{
    id: SessionId,
    userId: UserId,
    status: SessionStatus,
    startedAt: Date,
    completedAt: Date,
    lastSavedAt: Date
}