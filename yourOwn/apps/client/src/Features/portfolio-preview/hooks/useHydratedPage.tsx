// src/features/portfolio-preview/hooks/useHydratedPage.ts
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchHydratedPage } from "../services/layoutService";
import { PortfolioModel } from "../../../domain/types";

export function useHydratedPage(layoutName: string): UseQueryResult<PortfolioModel, Error> {
  return useQuery({
    queryKey: ['layout', 'hydrated', layoutName],
    queryFn: () => fetchHydratedPage(layoutName), // Service call is now externalized
    staleTime: 1000 * 60 * 5, 
    enabled: !!layoutName, // Don't run if the name isn't set yet
  });
}