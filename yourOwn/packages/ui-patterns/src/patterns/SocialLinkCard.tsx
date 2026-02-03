// src/patterns/SocialLinkCard.tsx
import { PatternProps } from "../interfaces";
// Removed Lucide imports as we are using custom SVGs now
import gitHub from "../../../assets/github (1).svg";
import insta from "../../../assets/insta.svg";
import linkedIn from "../../../assets/linkedin.svg";

export const SocialLinkCard = ({ data, className }: PatternProps) => {
  // 1. Map schema keys to your imported SVG files
  const svgMap: Record<string, string> = {
    github: gitHub,
    linkedin: linkedIn,
    instagram: insta,
  };

  // Define base color and hover color (could use theme variables here)
  const iconColorClass = "text-red-400 hover:text-red-500"; 

  return (
    /* 2. Outer div added for future extensibility */
    <div className={`social-links-wrapper w-full py-8 ${className ?? ""}`}>
      
      {/* Main content area - centered row, borders removed */}
      <div className="flex flex-row items-center justify-center gap-6">
        {data?.links && Object.entries(data.links).map(([key, url]) => {
            if (!url || !svgMap[key.toLowerCase()]) return null;
            
            const svgSource = svgMap[key.toLowerCase()];

            return (
              <a 
                key={key} 
                href={url as string} 
                target="_blank" 
                rel="noopener noreferrer"
                // 3. Apply color classes here. The child div uses 'bg-current' to inherit this color.
                className={`group transition-all duration-300 ${iconColorClass}`}
                aria-label={key} // Accessibility label since text is hidden
              >
                {/* 4. CSS Mask Technique to color the imported SVG file */}
                <div 
                  className="w-8 h-8 bg-current transition-transform group-hover:-translate-y-1"
                  style={{
                    maskImage: `url(${svgSource})`,
                    WebkitMaskImage: `url(${svgSource})`, // Safari support
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    maskSize: 'contain'
                  }}
                />
              </a>
            );
          })}
      </div>

      {/* You can add more content here later inside the outer div */}
    </div>
  );
};