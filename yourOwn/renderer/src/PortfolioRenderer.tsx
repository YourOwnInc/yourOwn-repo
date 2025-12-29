// PortfolioRenderer.tsx
import React, { useMemo } from "react";
import { PATTERN_REGISTRY } from "./patterns-bridge";
import portfolioData from "../src/data/portfolio.json";

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
  console.log("Renderer");
  const resolved = (data ?? portfolioData) as PortfolioRenderData;
  const { layout, experiences } = resolved;

  console.log("Patterrn Registry: ", PATTERN_REGISTRY);
  if(!data) {
    console.log("Missing render Data");
    return <div> Missing render Data </div>
  
  }


  console.log("data:", data );
  const experienceMap = useMemo(
    () => Object.fromEntries(experiences.map((e) => [e.id, e])),
    [experiences]
  );

  const placementMap = useMemo(
    () => Object.fromEntries(layout.placements.map((p) => [p.slotId, p])),
    [layout.placements]
  );

  const containerStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    overflow: "auto",
  };

  const sectionStyles: React.CSSProperties = {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  };

  return (
    <div style={containerStyles}>
      {layout.slots.map((slot) => {
        const placement = placementMap[slot.id];
        if (!placement) return null;

        const expData = experienceMap[placement.experienceId];

        const PatternComponent =
          PATTERN_REGISTRY[placement.patternId] ;

          console.log("PatternComponent: ", PatternComponent);

        return (
          <div key={slot.id} style={sectionStyles}>
            <PatternComponent data={expData} />
          </div>
        );
      })}
    </div>
  );
};
