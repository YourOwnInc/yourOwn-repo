import type { ComponentType } from "react";
import type { ExperienceDTO, RenderNode, Slot, PatternId } from "../domain/types";
import ExpCard from "./ExpCard";
import ExpRow from "./ExpRow";

type PreviewProps = { data: ExperienceDTO; props?: Record<string, any> };

type PatternDef = {
  id: PatternId;
  component: ComponentType<PreviewProps>;  // PREVIEW ONLY
  toRenderNode: (args: { data: ExperienceDTO; props?: any; slot: Slot }) => RenderNode;
};

export const PATTERNS: Record<PatternId, PatternDef> = {
  "exp.card.v1": {
    id: "exp.card.v1",
    component: ({ data }) => <ExpCard title={data.title} summary={data.summary} />,
    toRenderNode: ({ data, slot }) => ({
      type: "experience.card.v1",
      props: { area: slot.area, title: data.title, summary: data.summary ?? "" },
    }),
  },
  "exp.row.v1": {
    id: "exp.row.v1",
    component: ({ data }) => <ExpRow title={data.title} dates={[data.start, data.end].filter(Boolean).join(" — ")} />,
    toRenderNode: ({ data, slot }) => ({
      type: "experience.row.v1",
      props: { area: slot.area, title: data.title, dates: [data.start, data.end] },
    }),
  },
};

