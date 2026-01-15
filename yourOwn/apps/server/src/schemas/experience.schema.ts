// src/schemas/experience.schema.ts
import { z } from "zod";

export const ExperienceKindClient = z.enum([
  "internship", "project", "job", "volunteering", "text-content"
]);

// UI sends ISO strings; we transform -> Date | null for the repo/DB layer
const iso = z.string().datetime().optional().nullable()
  .transform(v => (v ? new Date(v) : null));

export const ExperienceCreateSchema = z.object({
  title: z.string().min(1, "title is required"),
  summary: z.string().trim().optional(),
  start: iso.optional(), // Assuming 'iso' is your helper for Date transformation
  end: iso.optional(),
  kind: ExperienceKindClient.optional(),
  // Add content validation here
  content: z.any().optional().default({}), 
});
export const ExperienceUpdateSchema = ExperienceCreateSchema.partial();

export const ExperienceQuerySchema = z.object({
  // you can keep either header context or these query fields; ctx is preferred
  sessionId: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  kind: ExperienceKindClient.optional(),
});

export type ExperienceCreateBody = z.infer<typeof ExperienceCreateSchema>;
export type ExperienceUpdateBody = z.infer<typeof ExperienceUpdateSchema>;
export type ExperienceQuery = z.infer<typeof ExperienceQuerySchema>;
