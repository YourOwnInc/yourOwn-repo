// useHydratedLayout.ts
import React from "react";
import { useMemo } from "react";
import { PATTERN_REGISTRY } from "@yourown/ui-patterns/src/registry";

export const useHydratedLayout = (
  placements: any[], 
  experienceLibrary: any[]
) => {
  return useMemo(() => {
    const map: Record<string, React.ReactNode> = {};

    if (!placements || placements.length === 0) return map;

    const flatLibrary = experienceLibrary?.flat(Infinity) || [];

    placements.forEach((p) => {
      // 1. RECURSIVE CHECK: Is this a nested layout?
      if (p.type === "layout") {
        // For now, we'll mark where the recursion should happen
        // We will pass the component itself into this later
        map[p.slotId] = "RECURSIVE_RENDERER_TRIGGER"; 
      } 
      // 2. STANDARD CHECK: Is it a pattern?
      else {
        const exp = flatLibrary.find((e) => e.id === p.experienceId || e.id === p.profileId);
        const Pattern = PATTERN_REGISTRY[p.patternId];

        if (exp && Pattern) {
          map[p.slotId] = React.createElement(Pattern, { data: exp });
        }
      }
    });

    return map;
  }, [placements, experienceLibrary]);
};