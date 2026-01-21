import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../../../core/auth/UserContext";
import { 
  listExperiences, 
  createExperience, 
  updateExperience, 
  deleteExperience 
} from "../services/experienceService";

// 1. Centralized Keys for the Cache
const KEYS = {
  all: (sessionId: string) => ['experiences', sessionId] as const,
};

export function useExperiences() {
  const { sessionId, authToken } = useUser();

  return useQuery({
    queryKey: KEYS.all(sessionId || ""),
    queryFn: () => listExperiences(sessionId!),
    enabled: !!sessionId && !!authToken,
    staleTime: 30_000, // Replacing your STALE_MS logic
  });
}

export function useAddExperience() {
  const queryClient = useQueryClient();
  const { sessionId, authToken } = useUser();

  return useMutation({
    mutationFn: (payload: any) => createExperience(sessionId!, payload),
    onSuccess: () => {
      // This "invalidates" the cache, triggering an automatic re-fetch
      queryClient.invalidateQueries({ queryKey: KEYS.all(sessionId!) });
    },
  });
}

export function useRemoveExperience() {
  const queryClient = useQueryClient();
  const { sessionId, authToken } = useUser();

  return useMutation({
    mutationFn: (id: string) => deleteExperience(sessionId!, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEYS.all(sessionId!) });
    },
  });
}