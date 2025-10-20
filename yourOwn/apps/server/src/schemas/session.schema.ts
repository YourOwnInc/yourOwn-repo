import {z} from 'zod';

export const StartSessionBody = z.object({
    metadata: z.record(z.any()).optional()
})

export type StartSessionBody = z.infer <typeof StartSessionBody >;

export const SaveSessionBody = z.object({ 
    status: z.enum(['active','paused']).optional(),
    metadata: z.record(z.any()).optional(),
})

export type SaveSessionBody = z.infer <typeof StartSessionBody >;

export const AddExperienceEntryBody = z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    media: z.array(z.any()).default([])
})

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