// PortfolioRenderer.tsx
import React, { useMemo } from "react";
import { LAYOUT_REGISTRY } from "../../../../../../packages/layouts/layoutRegistry";
import { PATTERN_REGISTRY } from "@yourown/ui-patterns/src/registry";
import { PortfolioModel, HydratedLayoutDTO } from "../../../domain/types";
import { LayoutTemplate } from "lucide-react";



type Slot = { clientSlotId: string; area: string };
type Placement = { slotId: string; experienceId: string; patternId: string };
type Layout = { layoutName: string; id: string,  slots: Slot[]; placements: Placement[] };
type Experience = { id: string; kind: string; title?: string; [k: string]: any };

interface PortfolioViewerProps {
  data: HydratedLayoutDTO;
}

// Use destructuring in the function signature to get properties from the flat object
export const PortfolioRenderer = ({ 
  layoutName, 
  experienceLibrary, 
  placements,
  slots
}: HydratedLayoutDTO) => {
  
  console.log("Placements in renderer:", placements);
  console.log("Exp in renderer:", experienceLibrary);

  // 1. Find the Layout Component
  const LayoutBlueprint = LAYOUT_REGISTRY[layoutName] || LAYOUT_REGISTRY["home"];

  // 2. Prepare the Slot Map
  const slotMap = useMemo(() => {
    const map: Record<string, React.ReactNode> = {};

    // placements is now a top-level array, not nested under 'layout'
    placements?.forEach((p) => {
      const exp = experienceLibrary.find((e) => e.id === p.experienceId);
      const Pattern = PATTERN_REGISTRY[p.patternId];

      if (exp && Pattern) {
        map[p.slotId] = <Pattern data={exp} />;
      }
    });
    
    return map;
  }, [placements, experienceLibrary]);

  console.log("slotMap", slotMap);

  if (!LayoutBlueprint) return <div>Missing Layout Blueprint</div>;

  return <LayoutBlueprint slots={slotMap} />;
};