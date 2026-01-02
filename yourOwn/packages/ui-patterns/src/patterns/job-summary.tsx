 
 interface JobData {
  title: string;
  company: string;
  startDate: string; // ISO string or formatted string
  endDate?: string;  // Optional, if null assume "Present"
  summary: string[]; // Array of paragraphs for better formatting
  skills: string[];
  images?: { alt: string; url?: string }[]; // Optional images
}

 interface PatternProps {
    data: JobData;
    className?: string;
}


// data: title , company, duration, summary[paragraphs], images, skills
export const JobSummary = ({data, className}: PatternProps) => {
    // Helper to format dates (Move this to a utility file later)
  const dateLabel = `${data.startDate} - ${data.endDate || 'Present'}`;

  return (
    // 1. Container: Semantic <article> for accessibility
    <article 
      className={`
        group relative flex flex-col gap-4 p-6 
        bg-white border border-gray-200 rounded-xl transition-all hover:shadow-md
        ${className}
      `}
    >
      {/* 2. Header Section: Title and Metadata */}
      <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {data.title}
          </h3>
          <div className="text-base font-medium text-gray-700">
            {data.company}
          </div>
        </div>
        
        <time className="text-sm font-mono text-gray-500 bg-gray-50 px-2 py-1 rounded">
          {dateLabel}
        </time>
      </header>

      {/* 3. Main Content: Mapping paragraphs */}
      <div className="space-y-3 text-gray-600 leading-relaxed text-black">
        {data.summary.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {/* 4. Visual Assets: Image Placeholders */}
      {data.images && data.images.length > 0 && (
        <div className="flex gap-4 overflow-x-auto pb-2 mt-2">
          {data.images.map((img, idx) => (
            <div 
              key={idx} 
              className="
                flex-shrink-0 w-48 h-32 
                bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg 
                flex items-center justify-center text-xs text-gray-400
              "
              title="Image Placeholder"
            >
              {/* This mimics the Figma 'Frame' for an image */}
              <span className="font-medium">Image: {img.alt}</span>
            </div>
          ))}
        </div>
      )}

      {/* 5. Footer: Skills Tags */}
      {data.skills.length > 0 && (
        <footer className="mt-2 pt-4 border-t border-gray-100">
          <ul className="flex flex-wrap gap-2" aria-label="Skills used">
            {data.skills.map((skill) => (
              <li 
                key={skill}
                className="
                  px-3 py-1 text-xs font-semibold text-blue-700 
                  bg-blue-50 rounded-full
                "
              >
                {skill}
              </li>
            ))}
          </ul>
        </footer>
      )}
    </article>
  );
}

