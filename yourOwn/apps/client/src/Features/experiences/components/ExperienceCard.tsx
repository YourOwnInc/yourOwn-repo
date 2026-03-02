// apps/client/src/ui/ExperienceCard.tsx

interface ExperienceCardProps {
  experience: any; // Using any for now to bypass missing type definition, can be strict typed later
  // We pass actions as props so the card remains "dumb" and reusable
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ExperienceCard({ experience, onEdit, onDelete }: ExperienceCardProps) {
  return (
    <div className="min-w-[300px] p-5 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        <div className="flex justify-between items-start border-b pb-4 mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 pr-4">{experience.title}</h3>
            {experience.organization && (
              <p className="text-xs text-gray-500">{experience.organization}</p>
            )}
          </div>
          <span className="text-[10px] uppercase tracking-wider bg-gray-50 px-2 py-1 rounded text-gray-400">
            {experience.type ?? 'Other'}
          </span>
        </div>

        {/* Display Variants */}
        {experience.variants && experience.variants.length > 0 && (
          <div className="flex flex-col gap-2 mb-4">
            <h4 className="text-[10px] font-bold uppercase text-gray-400">Variants ({experience.variants.length})</h4>
            {experience.variants.map((v: any) => (
              <div key={v.id ?? v.label} className="bg-gray-50 p-2 border rounded-md text-xs">
                <span className="font-semibold block">{v.label}</span>
                {v.summaryShort && <span className="text-gray-600 block truncate">{v.summaryShort}</span>}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-2 border-t pt-2">
        <button
          onClick={() => onEdit?.()}
          className="text-xs font-medium text-blue-600 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete?.()}
          className="text-xs font-medium text-red-500 hover:text-red-700"
        >
          Delete Base Experience
        </button>
      </div>
    </div>
  );
}