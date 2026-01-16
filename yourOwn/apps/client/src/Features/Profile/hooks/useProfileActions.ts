// src/features/profile/hooks/useProfileActions.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile, upsertLink, deleteLink } from "../services/profileService";
import { profileKeys } from "./useProfiles";

export function useProfileActions(profileId?: string) {
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: (data: any) => updateProfile(profileId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.lists() });
      if (profileId) {
        queryClient.invalidateQueries({ queryKey: profileKeys.detail(profileId) });
      }
    },
  });

  const upsertLinkMutation = useMutation({
    mutationFn: (linkData: any) => upsertLink(profileId!, linkData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.detail(profileId!) });
    },
  });

  return {
    updateProfile: updateProfileMutation,
    upsertLink: upsertLinkMutation,
    isUpdating: updateProfileMutation.isPending || upsertLinkMutation.isPending,
  };
}