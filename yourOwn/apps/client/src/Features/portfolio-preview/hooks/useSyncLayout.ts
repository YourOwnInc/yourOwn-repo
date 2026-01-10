// src/features/portfolio-preview/hooks/useSyncLayout.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { syncLayout } from "../services/layoutService";

export function useSyncLayout(layoutId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    // 1. Call the service function
    mutationFn: (payload: { slots: any[], placements: any[] }) => 
      syncLayout(layoutId, payload),

    onSuccess: (updatedData) => {
      // 2. Update the cache for this specific layout
      // This ensures the "Viewer" mode reflects the new changes immediately
      queryClient.setQueryData(['layout', 'hydrated', updatedData.LayoutId], updatedData);
      
      console.log("Layout synced successfully!");
    },
    onError: (error) => {
      console.error("Failed to sync layout:", error);
    }
  });
}