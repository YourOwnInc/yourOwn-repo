// src/features/profile/pages/ProfilePreview.tsx
import React, { useEffect, useState } from "react";
import { useProfiles, useProfileDetail } from "../hooks/useProfiles";
import { ProfileCard } from "../components/ProfileCard";
// src/features/portfolio-preview/pages/PortfolioPage.tsx
import { ArrowLeft, Edit3, Eye } from "lucide-react"; // Import icons
import { Link } from "react-router-dom";

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

  console.log("profiledetail", profileDetail)

  if (listLoading) return <div className="p-10 text-center">Loading your profiles...</div>;
  if (listError) return <div className="p-10 text-red-500">Error loading profiles.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <div className="absolute top-4 left-4 z-[100] flex items-center gap-4">
                {/* Back to Landing Icon */}
                <Link 
                  to="/landing" 
                  className="p-2 bg-black/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all text-white shadow-lg"
                  title="Back to Landing"
                >
                  <ArrowLeft size={20} />
                </Link>
  
              </div>
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