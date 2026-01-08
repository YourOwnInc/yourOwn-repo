export type SessionId = string ;
export type SlotId = string;
export type ExperienceId = string;
export type PatternId =  "exp.card.v1" | "exp.row.v1"; // extend later

export type ExperienceDTO = {
    id: ExperienceId;
    title: string;
    summary?: string;
    kind?: string;
    start?: string; // ISO
    end?: string;   // ISO
}

export type Slot = {
    id: SlotId;
    area: string;

}

export type Placement = {
    slotId: string;
    experienceId: ExperienceId;
    patternId: string;
}


// Layout model stored by server
export type LayoutModel = {
  id: string;
  sessionId: SessionId;
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