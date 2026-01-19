// PortfolioRenderer.tsx
import React, { useMemo } from "react";
import { LAYOUT_REGISTRY } from "../../../../../../packages/layouts/layoutRegistry";
import { PATTERN_REGISTRY } from "@yourown/ui-patterns/src/registry";
import { HydratedLayoutData, ManifestData , PortfolioRendererData} from "../types/portoflio.types";
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


export const PortfolioRenderer = ({ 
  layoutName, 
  experienceLibrary, 
  placements,
  slots,
  manifest, // 1. Destructure the manifest from the "package"
}: PortfolioRendererData) => { // 2. Use the flat PortfolioRendererData type

  const LayoutBlueprint = LAYOUT_REGISTRY[layoutName] || LAYOUT_REGISTRY["home"];
  
  // 3. Pass the manifest to the hook
  const slotMap = useHydratedLayout(placements, experienceLibrary, manifest);
  
  console.log("slotmap ", slotMap)
  // ... recursion logic ...

  if (!LayoutBlueprint) return <div>Missing Layout Blueprint</div>;

  return <LayoutBlueprint slots={slotMap} />;
};