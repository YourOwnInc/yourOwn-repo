import { z} from "zod"

export const LinkedSchema = z.object( {
    emial: z.string().email().optional(),
    gitub:z.string().url().optional(),
    linkedin: z.string().url().optional(),
    website:z.string().url().optional(),
    twitter:z.string().url().optional(),
})

export const profileSchema = z.object({
    //TODO: add schema and fields of a profile, will act as the "userobject" while theres no user account 
}) 

