export type LinkPlatform = 'github' | 'linkedin' | 'twitter' | 'instagram' | 'website' | 'other';

export interface ProfileLink {
  id: string;
  platform: LinkPlatform;
  url: string;
  label?: string;
}

export interface ProfileDTO {
  id: string;
  name: string;
  bio?: string;
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