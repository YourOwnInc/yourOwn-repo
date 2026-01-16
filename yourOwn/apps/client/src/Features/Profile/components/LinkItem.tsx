// individual link with icon logic // src/features/profile/components/LinkItem.tsx
import { Github, Linkedin, Instagram, Globe, Youtube, Twitter, ExternalLink } from 'lucide-react';
import { ProfileLink } from '../types/profile.types';

const ICON_MAP = {
  github: <Github className="w-5 text-black h-5" />,
  linkedin: <Linkedin className="w-5 h-5 text-blue-600" />,
  instagram: <Instagram className="w-5 h-5 text-pink-500" />,
  youtube: <Youtube className="w-5 h-5 text-red-600" />,
  twitter: <Twitter className="w-5 h-5 text-blue-400" />,
  default: <Globe className="w-5 h-5" />
};

export const LinkItem = ({ link }: { link: ProfileLink }) => {
  const Icon = ICON_MAP[link.platform] || ICON_MAP.default;

  return (
    <a 
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
    >
      <div className="flex items-center gap-3">
        {Icon}
        <span className="font-medium text-gray-700 group-hover:text-blue-700">
          {link.label || link.platform}
        </span>
      </div>
      <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  );
};