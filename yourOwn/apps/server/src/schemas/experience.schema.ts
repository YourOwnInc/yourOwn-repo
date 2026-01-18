// src/schemas/experience.schema.ts
import { z } from "zod";

// Aligning with your Prisma ExperienceType Enum
export const ExperienceTypeSchema = z.enum([
  "WORK", "PROJECT", "LEADERSHIP", "VOLUNTEERING", "ACADEMIC", "OTHER"
]);


const isoDate = z.string().datetime().optional().nullable()
  .transform(v => (v ? new Date(v) : null));

export const ExperienceCreateSchema = z.object({
  // CORE DATA
  title: z.string().min(1, "title is required").default("experience"),
  type: ExperienceTypeSchema.default("WORK"),
  startDate: isoDate.optional(),
  endDate: isoDate.optional(),
  isCurrent: z.boolean().default(false),

  // EXTENDED CONTENT
  roleTitle: z.string().optional().nullable(),
  organization: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  summaryShort: z.string().trim().optional().nullable(),
  summaryLong: z.string().trim().optional().nullable(),
  problemStatement: z.string().trim().optional().nullable(),
  solutionDetails: z.string().trim().optional().nullable(),
  
  // Arrays default to empty to avoid null pointer errors in the frontend
  impactBullets: z.array(z.string()).default([]),
  techStack: z.array(z.string()).default([]),

  // METADATA (JSON storage for links/extra bits)
  metadata: z.record(z.any(), z.any()).optional().default({}),
});

export const ExperienceUpdateSchema = ExperienceCreateSchema.partial();
/**
 * The Manifest Schema: For high-level lists
 * Used for the future API call that only sends what's needed for cards.
 */
export const ExperienceManifestSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  type: ExperienceTypeSchema,
  organization: z.string().optional().nullable(),
  roleTitle: z.string().optional().nullable(),
  summaryShort: z.string().optional().nullable(),
  techStack: z.array(z.string()),
});

// Utility Types derived from the schemas
export type ExperienceCreateBody = z.infer<typeof ExperienceCreateSchema>;
// export type ExperienceUpdateBody = z.infer<typeof ExperienceCreateSchema.partial()>;
export type ExperienceManifest = z.infer<typeof ExperienceManifestSchema>;