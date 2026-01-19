// PortfolioRenderer.tsx
import React, { useMemo } from "react";
import { LAYOUT_REGISTRY } from "../../../../../../packages/layouts/layoutRegistry";
import { PATTERN_REGISTRY } from "@yourown/ui-patterns/src/registry";
import { HydratedLayoutData, ManifestData } from "../types/portoflio.types";
import { LayoutTemplate } from "lucide-react";
import { useHydratedLayout } from "../hooks/useHydratedLayout";


type Slot = { clientSlotId: string; area: string };
type Placement = 
     | { slotId: string; experienceId: string; patternId: string , type: "pattern"}
     | { slotId: string; layoutId: string , type: "layout" };
type Layout = { layoutName: string; id: string,  slots: Slot[]; placements: Placement[] };
type Experience = { id: string; type: string; title?: string; [k: string]: any };

interface PortfolioViewerProps {
  data: HydratedLayoutData;
}
interface PortfolioRendererData {
  data: HydratedLayoutData;
  manifest: ManifestData
}

// Use destructuring in the function signature to get properties from the flat object
export const PortfolioRenderer = ({ 
  layoutName, 
  experienceLibrary, 
  placements,
  slots,
}: HydratedLayoutData) => {



  const LayoutBlueprint = LAYOUT_REGISTRY[layoutName] || LAYOUT_REGISTRY["home"];
  const slotMap = useHydratedLayout(placements, experienceLibrary)
  
  // Recursive function . checks if a slotMap has type layout 
  Object.keys(slotMap).forEach(slotId => {
    if(slotMap[slotId] === "RECURSIVE_RENDERER_TRIGGER") {
      const placement = placements.find( p => p.slotId === slotId);

    }
  })

  if (!LayoutBlueprint) {
    console.error("❌ [PortfolioRenderer] Missing Layout Blueprint for:", layoutName);
    return <div>Missing Layout Blueprint</div>;
  }

  return <LayoutBlueprint slots={slotMap} />;
};