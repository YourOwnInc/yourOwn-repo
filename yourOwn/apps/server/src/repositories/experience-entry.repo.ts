// src/repositories/experience-entry.repo.ts
import { ExperienceEntryId } from "../domain/experience-entry";

export interface CreateEntryInput {
  sessionId: string;
  userId: string | null; // still guest-friendly
  title: string;
  summary: string;
  contentBlocks: any[];
  media: any[];
  templateVariantId: string | null;
  tags: string[];
}

export interface ExperienceEntry {
  id: ExperienceEntryId;
  sessionId: string;
  userId: string | null;
  title: string;
  summary: string;
  contentBlocks: any[];
  media: any[];
  templateVariantId: string | null;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ExperienceEntryRepo {
  create(input: CreateEntryInput): Promise<ExperienceEntry>;
  findBySession(sessionId: string): Promise<ExperienceEntry[]>;
  // optional:
  findById(id: string): Promise<ExperienceEntry | null>;
  update(id: string, patch: Partial<Omit<ExperienceEntry, "id"|"sessionId"|"createdAt">>): Promise<ExperienceEntry>;
  delete(id: string): Promise<void>;
}
