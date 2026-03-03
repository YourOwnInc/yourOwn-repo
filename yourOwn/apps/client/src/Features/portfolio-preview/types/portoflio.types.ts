import { ExperienceEntry } from "../../../shared/types";
export type Tab = {
  id: string;
  name: string;
};

export type ManifestData = {
  tabs: Tab[];
};

export type Placement = {
  slotId: string;
  experienceVariantId?: string;
  profileId?: string;
  patternId: string;
  metadata?: Record<string, any>;
};

export type HydratedLayoutData = {
  id: string;
  layoutName: string;
  slots: Array<{
    id: string;
    clientSlotId: string;
    area: string;
  }>;
  placements: Placement[];
  experienceLibrary: ExperienceEntry[]
};

export type PortfolioRendererData = {
  id: string;
  layoutName: string;
  slots: Array<{
    id: string;
    clientSlotId: string; // Resolves TS error in PreviewRenderer
    area: string;
  }>;
  placements: Placement[];
  experienceLibrary: ExperienceEntry[]
  manifest: ManifestData
};


export interface PortfolioViewerProps {
  contentData: HydratedLayoutData;
  manifest: ManifestData
}
