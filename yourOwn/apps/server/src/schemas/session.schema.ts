import {z} from 'zod';

export const StartSessionBody = z.object({
    metadata: z.record(z.string(), z.any()).optional()
})

export type StartSessionBody = z.infer <typeof StartSessionBody >;

export const SaveSessionBody = z.object({ 
    userId: z.uuid().optional(),
    status: z.enum(['active','paused']).optional(),
    metadata: z.record(z.string(), z.any()).optional(),
})

export type SaveSessionBody = z.infer <typeof SaveSessionBody >;

const MediaItemSchema = z.object({
  kind: z.enum(['image','video','link']),
  url: z.string().url(),
  alt: z.string().optional(),
  meta: z.record(z.string(), z.unknown()).optional(),
});

export const AddExperienceEntryBody = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  media: z.array(MediaItemSchema).default([]),
});

export type AddExperienceEntryBody = z.infer <typeof AddExperienceEntryBody >;

export const SelectTemplateBody = z.object({
  templateVariantId: z.string().uuid().nullable(), // null to clear
});
export type SelectTemplateBody = z.infer<typeof SelectTemplateBody>;

export const LinkSessionToUserBody = z.object({
  // You can also offer an alternative: { provider: "google", idToken: "..." }
  email: z.string().email(),
  password: z.string().min(8),
  createIfMissing: z.boolean().default(true),
});
export type LinkSessionToUserBody = z.infer<typeof LinkSessionToUserBody>;