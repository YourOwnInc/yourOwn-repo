// src/features/profile/components/ProfileList.tsx
import { ProfileSummary } from '../types/profile.types';

export const ProfileList = ({ profiles }: { profiles: ProfileSummary[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {profiles.map((p) => (
        <div key={p.id} className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
           <div className="flex items-center gap-4">
              <img src={p.avatarUrl} className="w-12 h-12 rounded-full" />
              <div>
                <h4 className="font-semibold text-black">{p.displayName}</h4>

              </div>
           </div>
        </div>
      ))}
    </div>
  );
};