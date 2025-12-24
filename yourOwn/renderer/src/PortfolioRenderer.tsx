// PortfolioRenderer.tsx
import React, { useMemo } from "react";
import { PATTERN_REGISTRY } from "../../packages/ui-patterns/src/registry";
import portfolioData from "../public/portfolio.json";

type Slot = { id: string; area: string };
type Placement = { slotId: string; experienceId: string; patternId: string };
type Layout = { slots: Slot[]; placements: Placement[] };
type Experience = { id: string; kind: string; title?: string; [k: string]: any };

export type PortfolioRenderData = {
  layout: Layout;
  experiences: Experience[];
};

type Props = {
  /** Dev-only override. In production export, omit this so it uses portfolio.json */
  data?: PortfolioRenderData;
};

export const PortfolioRenderer = ({ data }: Props) => {
  const source = data ?? (portfolioData as PortfolioRenderData);
  const { layout, experiences } = source;

  const experienceMap = useMemo(
    () => Object.fromEntries(experiences.map((e) => [e.id, e])),
    [experiences]
  );

  const placementMap = useMemo(
    () => Object.fromEntries(layout.placements.map((p) => [p.slotId, p])),
    [layout.placements]
  );

  const gridStyles: React.CSSProperties = {
    display: "grid",
    gap: "1rem",
    gridTemplateAreas: `
      "header header"
      "sidebar main"
    `,
    padding: "2rem",
  };

  return (
    <div style={gridStyles}>
      {layout.slots.map((slot) => {
        const placement = placementMap[slot.id];
        if (!placement) return null;

        const expData = experienceMap[placement.experienceId];

        const PatternComponent =
          PATTERN_REGISTRY[placement.patternId] ?? PATTERN_REGISTRY["default"];

        return (
          <div key={slot.id} style={{ gridArea: slot.area }}>
            <PatternComponent data={expData} />
          </div>
        );
      })}
    </div>
  );
};
