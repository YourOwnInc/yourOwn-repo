// src/features/profile/pages/ProfilePreview.tsx
import React, { useEffect, useState } from "react";
import { useProfiles, useProfileDetail } from "../hooks/useProfiles";
import { ProfileCard } from "../components/ProfileCard";

export const ProfilePreview = () => {
  // 1. Fetch the manifest (list of profiles)
  const { data: profiles, isLoading: listLoading, isError: listError } = useProfiles();
  
  // Local state initialized to null; will be set once profiles load
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);

  // Auto-select the first profile ID once the manifest is available
  useEffect(() => {
    if (profiles && profiles.length > 0 && !selectedProfileId) {
      setSelectedProfileId(profiles[0].id);
    }
  }, [profiles, selectedProfileId]);

  // 2. Fetch details for the automatically selected profile
  const { data: profileDetail, isLoading: detailLoading } = useProfileDetail(selectedProfileId || "");

  if (listLoading) return <div className="p-10 text-center">Loading your profiles...</div>;
  if (listError) return <div className="p-10 text-red-500">Error loading profiles.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Profile Preview</h1>

        </header>

        <main className="flex justify-center">
          {detailLoading || !selectedProfileId ? (
            <div className="animate-pulse flex flex-col items-center">
              <div className="rounded-full bg-gray-200 h-24 w-24 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-32"></div>
            </div>
          ) : (
            profileDetail && <ProfileCard profile={profileDetail} />
          )}
        </main>
      </div>
    </div>
  );
};