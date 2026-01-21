// src/features/profile/hooks/useProfiles.ts
import { useQuery } from "@tanstack/react-query";
import { getProfileManifest, getProfileById } from "../services/profileService";

export const profileKeys = {
  all: ["profiles"] as const,
  lists: () => [...profileKeys.all, "list"] as const,
  detail: (id: string) => [...profileKeys.all, "detail", id] as const,
};

// Hook for the list of profiles (Manifest)
export function useProfiles() {
  return useQuery({
    queryKey: profileKeys.lists(),
    queryFn: getProfileManifest,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Hook for a single profile detail
export function useProfileDetail(id: string) {
  return useQuery({
    queryKey: profileKeys.detail(id),
    queryFn: () => getProfileById(id),
    enabled: !!id,
  });
}