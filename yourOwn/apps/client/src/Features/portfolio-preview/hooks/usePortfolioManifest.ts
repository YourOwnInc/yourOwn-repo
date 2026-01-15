// src/features/portfolio-preview/hooks/usePortfolioManifest.ts
import { useQuery } from "@tanstack/react-query";
import { fetchPortfolioManifest } from "../services/layoutService";
import { ManifestData } from "../types/portoflio.types";

export function usePortfolioManifest(sessionId: string | null) {
  return useQuery<ManifestData>({
    queryKey: ['portfolio', 'manifest', sessionId],
    queryFn: () => fetchPortfolioManifest(sessionId),
    enabled: !!sessionId,
    // Manifests change rarely (only when adding/deleting tabs), 
    // so we keep it fresh for a long time.
    staleTime: 1000 * 60 * 10, 
  });
}