import { LinkItem } from '../components/LinkItem';
import { ProfileLink } from '../types/profile.types';


export const MOCK_PROFILE = {
  id: "prof_12345",
  sessionId: "sess_abcde",
  displayName: "Luis Alarcon",
  headline: "Software Engineering Student & System Architect",
  location: "Dallas, TX",
  bio: "Building YourOwn to redefine profile ownership. Passionate about system design, photography, and full-stack development.",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luis",
  skills: ["React", "TypeScript", "Node.js", "Prisma"],
  links: [
    {
      id: "l1",
      platform: "github" as const,
      url: "https://github.com",
      label: "GitHub Portfolio",
    },
    {
      id: "l2",
      platform: "linkedin" as const,
      url: "https://linkedin.com",
      label: "Connect on LinkedIn",
    },
    {
      id: "l3",
      platform: "instagram" as const,
      url: "https://instagram.com",
      label: "Photography Portfolio",
    },
    {
      id: "l4",
      platform: "website" as const,
      url: "https://yourown.com",
      label: "My Website",
    }
  ]
};

interface LinkData {
    links: ProfileLink
}


export const ProfilePreview = ({ profile = MOCK_PROFILE }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-xl">
        
        {/* Header Section: Test Avatar Spacing */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-28 h-28 bg-blue-50 rounded-full mb-6 overflow-hidden border-4 border-white shadow-md">
             <img 
               src={profile.avatarUrl} 
               alt="avatar" 
               className="w-full h-full object-cover" 
             />
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            {profile.displayName}
          </h2>
          <p className="text-blue-600 font-semibold text-sm mt-1 uppercase tracking-wider">
            {profile.headline}
          </p>
          <span className="text-gray-400 text-xs mt-2 flex items-center gap-1">
             📍 {profile.location}
          </span>
        </div>

        {/* Bio Section: Test Readability */}
        <div className="mb-10 text-center">
          <p className="text-gray-600 leading-relaxed text-sm px-4">
            {profile.bio}
          </p>
        </div>

        {/* Links Section: Test Icon Alignment and Vertical Spacing */}
        <div className="space-y-4">
           {profile.links.map((link) => (
             <LinkItem key={link.id} link={link} />
           ))}
        </div>

        {/* Branding footer for YourOwn */}
        <div className="mt-12 text-center">
          <p className="text-[10px] text-gray-300 font-bold uppercase tracking-[0.2em]">
            Powered by YourOwn
          </p>
        </div>
      </div>
    </div>
  );
};