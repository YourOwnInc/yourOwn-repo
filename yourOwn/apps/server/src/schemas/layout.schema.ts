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

export const PlacementSchema = z.object({
  id: z.string().optional(),
  slotId: z.string(),
  patternId: z.string(),
  // Support multiple entity types
  experienceId: z.string().optional().nullable(),
  profileId: z.string().optional().nullable(),
  // Add others as needed: educationId, projectId, etc.
});

// 2. Validation for individual slots
export const SlotSchema = z.object({
  id: z.string().min(1, "Slot ID is required"),
  area: z.string().min(1, "Area is required"),
});

// 3. The "Sync" payload for a specific tab
export const SyncLayoutSchema = z.object({
  slots: z.array(SlotSchema),
  placements: z.array(PlacementSchema),
});

// 4. Schema for creating a new tab/page
export const CreateLayoutSchema = z.object({
  layoutName: z.string()
    .min(1)
    .max(20)
    .regex(/^[a-z0-9-]+$/, "Tab names must be lowercase, numbers, or hyphens"),
});

export type SyncLayoutInput = z.infer<typeof SyncLayoutSchema>;

export type layoutItemInput = z.infer<typeof layoutItemInputSchema>;
export type UpdateLayoutInput = z.infer<typeof updateLayoutScheme>;

