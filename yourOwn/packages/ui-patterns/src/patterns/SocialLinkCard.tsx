// src/patterns/SocialLinkCard.tsx
import { PatternProps } from "../interfaces";
import gitHub from "../../../assets/github (1).svg";
import insta from "../../../assets/insta.svg";
import linkedIn from "../../../assets/linkedin.svg";

export const SocialLinkCard = ({ data, className }: PatternProps) => {
  const svgMap: Record<string, string> = {
    github: gitHub,
    linkedin: linkedIn,
    instagram: insta,
  };

  return (
    <div className={`w-full py-8 flex flex-row items-center justify-center gap-6 ${className ?? ""}`}>
      {data?.links && Object.entries(data.links).map(([key, url]) => {
        // Only render if we have both a URL in the data and a matching SVG
        if (!url || !svgMap[key.toLowerCase()]) return null;

        const svgSource = svgMap[key.toLowerCase()];

        return (
          <a
            key={key}
            href={url as string}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-300 hover:-translate-y-1 hover:opacity-80"
            aria-label={key}
          >
            <img
              src={svgSource}
              alt={`${key} link`}
              className="w-8 h-8 object-contain"
            />
          </a>
        );
      })}
    </div>
  );
};