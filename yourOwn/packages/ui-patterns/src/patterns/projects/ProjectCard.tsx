// @yourown/ui-patterns/src/patterns/ProjectCard.tsx
import { useNavigate } from 'react-router-dom';

export const ProjectCard = ({ data }: { data: any }) => {
  const navigate = useNavigate();

  // Destructure for readability
  const { summary } = data.content || {};

  return (
    <div 
      onClick={() => navigate(`./${data.slug}`)} 
      className="flex items-center p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 cursor-pointer transition-all"
    >
      <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center mr-4">
        {data.icon || "🚀"}
      </div>
      <div>
        <h3 className="text-white font-bold">{summary.title}</h3>
        <p className="text-zinc-400 text-sm">{summary.shortDescription}</p>
      </div>
    </div>
  );
};