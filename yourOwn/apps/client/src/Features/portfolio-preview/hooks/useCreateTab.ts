import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTab } from "../services/layoutService";

export function useCreateTab(sessionId: string | null) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: { layoutName: string; template?: string; slots?: any[] }) => {
            if (!sessionId) throw new Error("No session ID");
            return createTab(sessionId, payload);
        },
        onSuccess: () => {
            // Refresh the manifest so the new tab appears in the navigation
            queryClient.invalidateQueries({ queryKey: ['portfolio', 'manifest'] });
        },
        onError: (error) => {
            console.error("Failed to create tab:", error);
        }
    });
}
