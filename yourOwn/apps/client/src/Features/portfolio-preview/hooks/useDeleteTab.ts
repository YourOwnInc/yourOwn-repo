import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTab } from "../services/layoutService";

export function useDeleteTab() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: { layoutName: string }) => {
            return deleteTab(payload);
        },
        onSuccess: () => {
            // Refresh the manifest to immediately remove the tab from the UI
            queryClient.invalidateQueries({ queryKey: ['portfolio', 'manifest'] });
        },
        onError: (error) => {
            console.error("Failed to delete tab:", error);
        }
    });
}
