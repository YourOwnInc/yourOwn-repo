

// src/features/profile/types/profile.types.ts
export type LinkPlatform = 'github' | 'linkedin' | 'instagram' | 'twitter' | 'website' | 'youtube';

export interface ProfileLink {
  id: string;
  platform: LinkPlatform;
  url: string;
  label: string;
  isPrivate?: boolean; // For "YourOwn" ownership: hide/show links
  metadata?: {
    clickCount?: number;
    lastVerified?: string;
  };
}
export interface ProfileSummary {
  id: string;
  displayName: string;
  avatarUrl?: string;
//   isPrimary: boolean;
}


export interface ProfileDTO {
  id: string;
  displayName: string;
  bio?: string;
  headline: string;
  avatarUrl?: string;
  links: ProfileLink[];
  isPrimary: boolean;
  createdAt: string;
}

// Used for creating or updating profiles
export interface UpdateProfileInput {
  name?: string;
  bio?: string;
  avatarUrl?: string;
  isPrimary?: boolean;
}

// Used for the upsertLink function
export interface UpsertLinkInput {
  id?: string; // Optional: if provided, update. if not, create.
  platform: LinkPlatform;
  url: string;
  label?: string;
}