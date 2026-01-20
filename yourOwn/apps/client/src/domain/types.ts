export type SessionId = string ;
export type SlotId = string;
export type ExperienceId = string;
export type PatternId =  "exp.card.v1" | "exp.row.v1"; // extend later

export type ExperienceDTO = {
    id: ExperienceId;
    title: string;
    summary?: string;
    type?: string;
    start?: string; // ISO
    end?: string;   // ISO
}

export type Slot = {
    id: SlotId;
    area: string;

}

export type Placement = 
| {
    slotId: string;
    experienceId: ExperienceId;
    profileId: string;
    patternId: string;
    type: "pattern"
}
|{
    slotId: string;
    layoutId:   string;
    type: "layout"
};


// Layout model stored by server
export type LayoutModel = {
  id: string;
  layoutName: string;
  slots: Slot[];
  placements: Placement[];
  theme?: string;
};

// Render node used for export (UI-agnostic)
export type RenderNode = {
  type: string;                   // e.g., "experience.card.v1"
  props: Record<string, unknown>; // must include { area: string, ... }
};

// Combined model for preview/export
export type PortfolioModel = {
  layout: LayoutModel;
  experiences: ExperienceDTO[];
};

export type TabsDTO = {
  id: string,
  name: string,
}
// manifest body 
export type ManifestData = {
  tabs: TabsDTO[]
}

/** * Matches the actual JSON structure from your server screenshot.
 * The layout properties and the library are siblings.
 */
export type HydratedLayoutDTO = {
  id: string;             // The Layout UUID
  layoutName: string;     // e.g., "home"
  slots: Slot[];
  placements: Placement[];
  experienceLibrary: ExperienceDTO[]; 
  theme?: string;
};

