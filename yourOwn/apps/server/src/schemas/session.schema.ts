import { z } from "zod";

export const StartSessionBody = z.object({
  userId: z.uuid().optional().nullable(),   // allow anonymous
  metadata: z.record(z.any(), z.unknown()).optional().default({}) // simple, expandable
});
export type StartSessionBody = z.infer<typeof StartSessionBody>;

export const SaveSessionBody = z.object({
  userId: z.uuid().optional().nullable(), // make it not required 
  title: z.string().min(1).optional(),
  status: z.string().min(1),
  metadata: z.record(z.any(),z.unknown()).optional(),
});
export type SaveSessionBody = z.infer<typeof SaveSessionBody>;

export const AddExperienceEntryBody = z.object({
  title: z.string(),
  description: z.string().optional(),
  tags: z.array(z.string()).default([]).optional(),
});
export type AddExperienceEntryBody = z.infer<typeof AddExperienceEntryBody>;

export const SelectTemplateBody = z.object({
  templateVariantId: z.uuid().nullable(), // null to clear
});
export type SelectTemplateBody = z.infer<typeof SelectTemplateBody>;

export const LinkSessionToUserBody = z.object({
  userId: z.uuid(),
  email: z.email(),
  password: z.string().min(8),
  createIfMissing: z.boolean().default(true),
});
export type LinkSessionToUserBody = z.infer<typeof LinkSessionToUserBody>;
