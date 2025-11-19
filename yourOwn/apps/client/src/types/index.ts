// User types
export type UserId = string;

export interface User {
  id: UserId;
  name: string;
  email?: string;
  bio?: string;
  passwordHash?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Session types
export type SessionId = string;

export enum SessionStatus {
  Active = "active",
  Paused = "paused",
  Completed = "completed"
}

export interface Session {
  id: SessionId;
  userId: UserId | null;
  status: SessionStatus;
  startedAt: Date | null;
  completedAt: Date | null;
  lastSavedAt: Date | null;
}

// Experience Entry types
export type ExperienceEntryId = string;

export interface MediaItem {
  kind: 'image' | 'video' | 'link';
  url: string;
  alt?: string;
  meta?: Record<string, unknown>;
}

export interface ExperienceEntry {
  id: ExperienceEntryId;
  sessionId: string;
  type?: string; // "project", "internship", etc.
  title: string;
  summary: string;
  start?: string;
  end?: string;
  media?: MediaItem[];
  kind?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Portfolio Grid types for modular layout
export interface GridPosition {
  x: number; // grid column
  y: number; // grid row
}

export interface GridSize {
  width: number; // grid units (1x1, 2x1, 1x2, 2x2, etc.)
  height: number;
}

export interface PortfolioEntry extends ExperienceEntry {
  position: GridPosition;
  size: GridSize;
  images?: string[]; // Base64 image data for export
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface RegisterBody {
  email: string;
  name: string;
  passwordHash: string;
}

export interface LoginBody {
  email: string;
  passwordHash: string;
}

export interface StartSessionBody {
  userId?: string | null;
  metadata?: Record<string, unknown>;
}

export interface SaveSessionBody {
  userId: string;
  title?: string;
  status: string;
  metadata?: Record<string, unknown>;
}

export interface AddExperienceEntryBody {
  title: string;
  description?: string;
  tags?: string[];
}

// Local storage keys
export const STORAGE_KEYS = {
  USER_DATA: 'yourown_user_data',
  SESSION_ID: 'yourown_session_id',
  PORTFOLIO_ENTRIES: 'yourown_portfolio_entries',
  ONBOARDING_COMPLETE: 'yourown_onboarding_complete',
} as const;

