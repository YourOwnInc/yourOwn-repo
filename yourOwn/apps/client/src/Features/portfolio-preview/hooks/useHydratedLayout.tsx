// useHydratedLayout.ts
import React from "react";
import { useMemo } from "react";
import { PATTERN_REGISTRY } from "@yourown/ui-patterns/src/registry";
import { ManifestData } from "../types/portoflio.types";
// src/features/portfolio-preview/hooks/useHydratedLayout.tsx
export const useHydratedLayout = (
  placements: any[], 
  experienceLibrary: any[],
  manifest?: ManifestData 
) => {
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
    if (manifest ) {
      const NavPattern = PATTERN_REGISTRY["navigation"]; // Ensure this ID matches your registry
      if (NavPattern) {
        map["navigation"] = React.createElement(NavPattern, { data: manifest });
        console.log("nav pattern found")
      }
    }

    return map;
  }, [placements, experienceLibrary, manifest]);
};