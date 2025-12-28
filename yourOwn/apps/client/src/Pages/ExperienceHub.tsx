// apps/client/src/ui/ExperienceHub.tsx
import { usePortfolioStore } from "../domain/usePortfolioStore";
import ExperienceCard from "../components/experiences/ExperienceCard";

export default function ExperienceHub() {
  const { experiences, removeExperience, loading } = usePortfolioStore();

  // Grouping Logic
  const categories = ["project", "internship", "job", "volunteering"];

  if (loading) return <div className="p-8">Loading Hub...</div>;

  return (
    <div className="p-10 space-y-16 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Experience Hub</h1>
          <p className="text-gray-500">Manage and categorize your professional milestones.</p>
        </div>
        <button className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-all">
          + Add New
        </button>
      </header>

      {categories.map((cat) => {
        const filtered = experiences.filter((e) => e.kind === cat);
        if (filtered.length === 0) return null;

        return (
          <section key={cat} className="relative">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 border-l-2 border-blue-500 pl-4">
              {cat}s
            </h2>
            
            {/* Horizontal Scroll Logic */}
            <div className="flex gap-6 overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide snap-x">
              {filtered.map((exp) => (
                <div key={exp.id} className="snap-start">
                  <ExperienceCard 
                    experience={exp} 
                    onDelete={() => removeExperience(exp.id)} 
                    onEdit={() => {}}
                  />
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}