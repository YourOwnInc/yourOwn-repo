// src/patterns/SocialLinkCard.tsx
import { PatternProps } from "../interfaces";
import { Github, Linkedin, Instagram, Link as LinkIcon } from "lucide-react"; // Using Lucide for modern icons

export const SocialLinkCard = ({ data, className }: PatternProps) => {
  // Mapping keys from your LinkedSchema to actual Icons
  const iconMap: Record<string, any> = {
    github: <Github size={18} />,
    linkedin: <Linkedin size={18} />,
    instagram: <Instagram size={18} />,
    website: <LinkIcon size={18} />
  };

  return (
    <div className={`p-6 bg-slate-900/20 border border-slate-800 rounded-xl ${className ?? ""}`}>
      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6">Connect</h4>
      
      <div className="flex flex-col gap-4">
        {data?.links && Object.entries(data.links).map(([key, url]) => {
          if (!url) return null;
          
          return (
            <a 
              key={key} 
              href={url as string} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between group text-slate-400 hover:text-cyan-400 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <span className="text-slate-600 group-hover:text-cyan-500 transition-colors">
                  {iconMap[key.toLowerCase()] || <LinkIcon size={18} />}
                </span>
                <span className="text-sm font-medium capitalize tracking-tight">{key}</span>
              </div>
              
              {/* Subtle arrow that appears on hover */}
              <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-cyan-600">
                →
              </span>
            </a>
          );
        })}
      </div>
      
      <div className="mt-8 pt-4 border-t border-slate-800/50">
        <small className="text-[8px] font-bold uppercase tracking-widest text-slate-700">Pattern: Social Connectivity</small>
      </div>
    </div>
  );
};