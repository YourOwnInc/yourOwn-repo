import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile, upsertLink, deleteLink } from "../services/profileApiService";


export const profileKeys = {
    all: ["profiles"] as const,
    detail: (id: string )=> [...profileKeys.all, id] as const,
}


export function useProfileActions(profileId: string) {
  const queryClient = useQueryClient();

  // Update Profile Metadata (Name, Bio)
  const updateProfileMutation = useMutation({
    mutationFn: (data: any) => updateProfile(profileId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.all });
      queryClient.invalidateQueries({ queryKey: profileKeys.detail(profileId) });
    },
  });

  // Create or Update a Link
  const upsertLinkMutation = useMutation({
    mutationFn: (linkData: any) => upsertLink(profileId, linkData),
    onSuccess: () => {
      // Refresh the specific profile data to show the new/updated link
      queryClient.invalidateQueries({ queryKey: profileKeys.detail(profileId) });
    },
  });

  // Delete a Link
  const deleteLinkMutation = useMutation({
    mutationFn: (linkId: string) => deleteLink(profileId, linkId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.detail(profileId) });
    },
  });

  return {
    updateProfile: updateProfileMutation,
    upsertLink: upsertLinkMutation,
    deleteLink: deleteLinkMutation,
    isUpdating: updateProfileMutation.isPending || upsertLinkMutation.isPending,
  };
}