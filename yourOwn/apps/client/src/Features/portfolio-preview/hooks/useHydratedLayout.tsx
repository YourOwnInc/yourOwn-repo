// useHydratedLayout.ts
import React from "react";
import { useMemo } from "react";
import { PATTERN_REGISTRY } from "@yourown/ui-patterns/src/registry";
import { ManifestData } from "../types/portoflio.types";
import { useEditor } from "../context/EditorContext";
// src/features/portfolio-preview/hooks/useHydratedLayout.tsx
export const useHydratedLayout = (
  placements: any[],
  experienceLibrary: any[],
  manifest?: ManifestData
) => {
  const { isEditing, onAddTab, onDeleteTab, onAddExperience } = useEditor();
  console.log("manifest in HL", manifest);
  return useMemo(() => {
    const map: Record<string, React.ReactNode> = {};

    // 1. First, handle all explicit placements from your JSON
    const flatLibrary = experienceLibrary?.flat(Infinity) || [];
    placements?.forEach((p) => {
      const data = flatLibrary.find((e) => e.id === p.experienceId || e.id === p.profileId);
      const Pattern = PATTERN_REGISTRY[p.patternId];
      if (data && Pattern) {
        map[p.slotId] = React.createElement(Pattern, { data });
      }
    });

    // 2. AUTO-INJECTION: Check if a 'navigation' slot exists in the blueprint
    // If it does, and we have a manifest, inject the Nav Pattern automatically
    if (manifest) {
      const NavPattern = PATTERN_REGISTRY["navigation"]; // Ensure this ID matches your registry
      if (NavPattern) {
        map["navigation"] = React.createElement(NavPattern, {
          data: {
            ...manifest,
            renderTabAction: (tabName: string) => (
              isEditing && tabName !== "home" ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onDeleteTab?.(tabName);
                  }}
                  className="p-1.5 bg-zinc-900/60 backdrop-blur-sm border border-zinc-700/50 text-zinc-400 rounded-md hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50 transition-all m-2 shadow-lg z-50 pointer-events-auto"
                  title={`Delete ${tabName} page`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              ) : null
            ),
            renderAddPageAction: () => (
              isEditing ? (
                <button
                  onClick={onAddTab}
                  className="group flex justify-start items-center min-w-[40px] h-10 w-full transition-all duration-300 ease-in-out text-zinc-500 hover:text-white pointer-events-auto"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md border border-dashed border-zinc-600 group-hover:bg-zinc-800 transition-colors ml-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </div>
                  <span className="ml-4 text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    Add Page
                  </span>
                </button>
              ) : null
            )
          }
        });
        console.log("nav pattern found")
      }
    }

    return map;
  }, [placements, experienceLibrary, manifest, isEditing, onAddTab, onDeleteTab, onAddExperience]);
};