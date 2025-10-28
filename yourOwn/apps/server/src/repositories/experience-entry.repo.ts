// src/repositories/experience-entry.repo.ts
import { ExperienceEntryId } from "../domain/experience-entry";
import { z } from "zod";

/*
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
*/

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

export const AddExperienceEntryBody = z.object({
  sessionId: z.uuid(),
  userId: z.uuid().nullable(), 
  title: z.string(), 
  summary: z.string(), 
  contentBlocks: z.array(z.any()),
  media: z.array(z.any()),
  templateVariantId: z.uuid().nullable(),
  tags: z.array(z.string())
})

// Body of the request to add the experience entry
export type AddExperienceEntryBody = z.infer<typeof AddExperienceEntryBody>

export const SaveExperienceEntryBody = z.object({
  // Are we allowed to update the userId and templateVariantId
  userId: z.uuid().nullable().optional(), 
  templateVariantId: z.uuid().nullable().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  completedAt: z.date().nullable().optional(),
  lastSavedAt: z.date().optional(),
})

// Body of the request to save the experience entry
export type SaveExperienceEntryBody = z.infer<typeof SaveExperienceEntryBody>

export interface ExperienceEntryRepo {
  create(input: AddExperienceEntryBody): Promise<ExperienceEntry>;
  findBySession(sessionId: string): Promise<ExperienceEntry[]>;
  // optional:
  findById(id: string): Promise<ExperienceEntry | null>;
  update(id: string, patch: SaveExperienceEntryBody): Promise<ExperienceEntry>;
  delete(id: string): Promise<void>;
}
