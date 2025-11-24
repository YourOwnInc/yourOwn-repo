import { z} from "zod"

export const LinkedSchema = z.object( {
    emial: z.string().email().optional(),
    gitub:z.string().url().optional(),
    linkedin: z.string().url().optional(),
    website:z.string().url().optional(),
    twitter:z.string().url().optional(),
})

export const profileSchema = z.object({
    id: z.string().uuid().optional(),
    sessionId: z.string().uuid().optional(),
    userId: z.string().uuid().optional(),
    displayName: z.string().trim().min(1).max(100).optional(),
    headline: z.string().trim().max(160).optional(),
    location: z.string().trim().max(120).optional(),
    bio: z.string().trim().max(500).optional(),
    avatarUrl: z.string().url().optional(),
    skills: z.array(z.string().trim().min(1)).default([]),
    links: LinkedSchema.default({}),
}) 

