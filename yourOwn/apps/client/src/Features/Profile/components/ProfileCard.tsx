// src/features/profile/components/ProfileCard.tsx
import { ProfileDTO , ProfileLink} from '../types/profile.types';
// src/features/profile/components/ProfileCard.tsx
import { LinkItem } from './LinkItem';

export const ProfileCard = ({ profile }: any) => {
  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 bg-gray-100 rounded-full mb-4 overflow-hidden border-4 border-white shadow-sm">
           <img src={profile.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{profile.displayName}</h2>
        <p className="text-gray-500 font-medium">{profile.headline}</p>
        <p className="text-gray-400 text-sm">{profile.location}</p>
      </div>

      {/* Bio Section */}
      <div className="mb-8">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">About</h3>
        <p className="text-gray-600 leading-relaxed text-sm">{profile.bio}</p>
      </div>

      {/* Links Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Connect</h3>
        <div className="grid grid-cols-1 gap-3">
           {profile.links?.map((link: any) => (
             <LinkItem key={link.id} link={link} />
           ))}
        </div>
      </div>
    </div>
  );
};