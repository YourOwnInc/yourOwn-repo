// PortfolioRenderer.tsx
import React, { useMemo } from "react";
import { PATTERN_REGISTRY } from "./patterns-bridge";
import portfolioData from "./data/portfolio.json";
import { LAYOUT_REGISTRY } from "../../packages/layouts/layoutRegistry";

type Slot = { id: string; area: string };
type Placement = { slotId: string; experienceId: string; patternId: string };
type Layout = { id: string; slots: Slot[]; placements: Placement[] };
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

  console.log("Patterrn Registry: ", PATTERN_REGISTRY);
  if(!data) {
    console.log("Missing render Data");
    return <div> Missing render Data </div>
  
  }

  const { layout, experiences } = data;

   // 1. Find the Layout Component (Default to bento if missing)
  const LayoutBlueprint = LAYOUT_REGISTRY[layout.id] || LAYOUT_REGISTRY["bento-v1"];

  // 2. Prepare the Slot Map by matching placements to patterns
  const slotMap = useMemo(() => {
    const map: Record<string, React.ReactNode> = {};

    layout.placements.forEach((p) => {
      const exp = experiences.find((e) => e.id === p.experienceId);
      const Pattern = PATTERN_REGISTRY[p.patternId];

      if (exp && Pattern) {
        map[p.slotId] = <Pattern data={exp} />;
      }
    });
    
    return map;
  }, [layout.placements, experiences]);

  // 3. Render the Blueprint with the prepared slots
  return <LayoutBlueprint slots={slotMap} />;

};
