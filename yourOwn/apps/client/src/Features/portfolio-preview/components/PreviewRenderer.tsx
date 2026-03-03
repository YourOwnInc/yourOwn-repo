// PortfolioRenderer.tsx
import React, { useMemo } from "react";
import { LAYOUT_REGISTRY } from "../../../../../../packages/layouts/layoutRegistry";
import { PATTERN_REGISTRY } from "@yourown/ui-patterns/src/registry";
import { HydratedLayoutData, ManifestData, PortfolioRendererData } from "../types/portoflio.types";
import { LayoutTemplate, PlusCircle } from "lucide-react";
import { useHydratedLayout } from "../hooks/useHydratedLayout";
import { useEditor } from "../context/EditorContext";


type Slot = { clientSlotId: string; area: string };
type Placement =
  | { slotId: string; experienceId: string; patternId: string, type: "pattern" }
  | { slotId: string; layoutId: string, type: "layout" };
type Layout = { layoutName: string; id: string, slots: Slot[]; placements: Placement[] };
type Experience = { id: string; type: string; title?: string;[k: string]: any };

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

  const layoutDef = LAYOUT_REGISTRY[layoutName] || LAYOUT_REGISTRY["home"];
  const LayoutBlueprint = layoutDef.component;
  const blueprintSlots = layoutDef.config?.slots || [];

  // 3. Pass the manifest to the hook
  const slotMap = { ...useHydratedLayout(placements, experienceLibrary, manifest) };
  const { isEditing, onAddExperience } = useEditor();

  if (isEditing && blueprintSlots.length > 0) {
    blueprintSlots.forEach((slotDef: any) => {
      // Don't overwrite existing nav/identity internals unless it is an explicit content slot
      if (!slotMap[slotDef.clientSlotId] && !["navigation", "socials", "identity"].includes(slotDef.clientSlotId)) {
        slotMap[slotDef.clientSlotId] = (
          <div
            onClick={() => onAddExperience?.(slotDef.clientSlotId)}
            className="group flex flex-col items-center justify-center w-full h-full min-h-[120px] bg-zinc-900/30 border-2 border-dashed border-zinc-700/60 rounded-xl hover:bg-zinc-800/50 hover:border-indigo-500/80 transition-all cursor-pointer p-4"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600 group-hover:text-indigo-400 mb-2 transition-colors">
              <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 group-hover:text-indigo-300 transition-colors">
              Add to {slotDef.clientSlotId}
            </span>
          </div>
        );
      }
    });
  }

  // ... recursion logic ...

  if (!LayoutBlueprint) return <div>Missing Layout Blueprint</div>;

  const RenderedLayout = LayoutBlueprint as React.ElementType;
  return <RenderedLayout slots={slotMap} />;
};