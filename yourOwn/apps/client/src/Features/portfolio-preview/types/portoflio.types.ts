import { ExperienceEntry } from "../../../types";
export type Tab = {
  id: string;
  name: string;
};

export type ManifestData = {
  tabs: Tab[];
};

export type Placement = {
  slotId: string;
  experienceId: string;
  patternId: string;
};

export type HydratedLayoutData = {
  id: string;
  layoutName: string;
  slots: Array<{
    id: string;
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
