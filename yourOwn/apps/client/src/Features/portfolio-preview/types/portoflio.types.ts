import { ExperienceEntry } from "../../../types";
export type Tab = {
  id: string;
  name: string;
};

export type ManifestData = {
  tabs: Tab[];
  sessionId: string;
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
  experiences: ExperienceEntry[]
};
