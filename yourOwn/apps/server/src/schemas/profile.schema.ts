import { z } from "zod";

export const LinksSchema = z.object({
    email: z.string().email().optional().nullable(),
    github: z.string().url().optional().nullable(),
    linkedin: z.string().url().optional().nullable(),
    website: z.string().url().optional().nullable(),
    twitter: z.string().url().optional().nullable(),
});

export const ProfileSchema = z.object({
    // Header Content
    displayName: z.string().trim().min(1).max(100).optional(),
    headline: z.string().trim().max(160).optional(),
    location: z.string().trim().max(120).optional(),
    avatarUrl: z.string().url().optional().nullable(),
    
    // Detailed Content
    tagline: z.string().trim().optional().nullable(),
    bioShort: z.string().trim().max(500).optional().nullable(),
    bioLong: z.string().trim().optional().nullable(),
    philosophy: z.string().trim().optional().nullable(),
    
    // Arrays & JSON
    currentlyLearning: z.array(z.string().trim()).default([]),
    interests: z.array(z.string().trim()).default([]),
    skills: z.array(z.string().trim()).default([]),
    links: LinksSchema.default({}),
});

export type ProfileBody = z.infer<typeof ProfileSchema>;