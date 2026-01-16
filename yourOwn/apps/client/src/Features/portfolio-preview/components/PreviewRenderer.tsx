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



  const LayoutBlueprint = LAYOUT_REGISTRY[layoutName] || LAYOUT_REGISTRY["home"];
const slotMap = useMemo(() => {
  const map: Record<string, React.ReactNode> = {};

  if (!placements || placements.length === 0) {
 
    return map;
  }

  // FIX: Flatten the library in case it's nested (Array of Arrays)
  const flatLibrary = experienceLibrary?.flat(Infinity) || [];
  
 

  placements.forEach((p, idx) => {
    // Search in the flattened library instead
    const exp = flatLibrary.find((e) => e.id === p.experienceId);
    
    const Pattern = PATTERN_REGISTRY[p.patternId];

    if (exp && Pattern) {
      map[p.slotId] = <Pattern data={exp} />;
    }
    
  });
  
  return map;
}, [placements, experienceLibrary]);

  if (!LayoutBlueprint) {
    console.error("❌ [PortfolioRenderer] Missing Layout Blueprint for:", layoutName);
    return <div>Missing Layout Blueprint</div>;
  }

  return <LayoutBlueprint slots={slotMap} />;
};