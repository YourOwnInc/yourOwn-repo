import {z} from "zod";


// what an item in a layout should have 
export const layoutItemInputSchema =  z.object({
    experienceId: z.string().uuid(),
    position: z.number().int().nonnegative(),
    patternId: z.string().min(1).optional().nullable(),
    patternProps: z.record(z.any(), z.unknown()).optional().nullable(),
});

// Same schema as InputSchema - just updates it 
export const updateLayoutScheme = z.object({
    items: z.array(layoutItemInputSchema).min(1)
})

export type layoutItemInput = z.infer<typeof layoutItemInputSchema>;
export type UpdateLayoutInput = z.infer<typeof updateLayoutScheme>;

