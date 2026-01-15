import { useQuery } from "@tanstack/react-query";
import { getUserProfiles, getProfileById } from "../services/profileService";

export const profileKeys = {
    all: ["profiles"] as const,
    detail: (id: string )=> [...profileKeys.all, id] as const,
}

export function useProfiles( ) {
    return useQuery({
        queryKey: profileKeys.all,
        queryFn: getUserProfiles,
    })
}

export function useProfileDetail(id: string) {
  return useQuery({
    queryKey: profileKeys.detail(id),
    queryFn: () => getProfileById(id),
    enabled: !!id, // Only run if an ID is actually provided
  });
}