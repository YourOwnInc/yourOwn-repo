// apps/client/src/ui/ExperienceCard.tsx
import {ExperienceEntry} from "../../../shared/types"

interface ExperienceCardProps {
  experience: ExperienceEntry;
  // We pass actions as props so the card remains "dumb" and reusable
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ExperienceCard({ experience, onEdit, onDelete }: ExperienceCardProps) {
  return (
    <div className="min-w-[300px] h-48 p-5 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-900 truncate pr-4">{experience.title}</h3>
          <span className="text-[10px] uppercase tracking-wider bg-gray-50 px-2 py-1 rounded text-gray-400">
            {experience.type ?? 'Other'}
            
          </span>
        </div>

      </div>
      
      <div className="flex gap-3 mt-4">
        <button 
          onClick={() => onEdit?.()}
          className="text-xs font-medium text-blue-600 hover:underline"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete?.()}
          className="text-xs font-medium text-red-400 hover:text-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}