import { useExperiences, useAddExperience, useRemoveExperience } from "../Hooks/useExperienceHooks";
import ExperienceCard from "../components/ExperienceCard";
import { SocialDock, NewDock } from "../components/dockButton";

export default function ExperienceHub() {
  // TanStack Query gives you data, loading, and error states automatically
  const { data: experiences = [], isLoading } = useExperiences();
  const { mutate: addExp } = useAddExperience();
  const { mutate: removeExp } = useRemoveExperience();

  const categories = ["project", "internship", "job", "volunteering"];

  const handleAddNew = () => {
    addExp({
      title: "Portfolio MVP",
      summary: "Built with TanStack Query",
      type: "internship",
      start: new Date().toISOString(),
      end: new Date().toISOString(),
    });
  };

  // if (isLoading) return <div className="p-8">Loading Hub...</div>;

  return (
    <div className="p-10 space-y-16 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-end">
        
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Experience Hub</h1>
          <p className="text-gray-500"></p>
          
        </div>

        
        <button 
          className="bg-black text-white px-6 py-2 rounded-lg font-medium"
          onClick={handleAddNew}
        >
          + Add New
        </button>

      </header>
        

      {categories.map((cat) => {
        const filtered = experiences.filter((e: any) => e.type === cat);
        if (filtered.length === 0) return null;

        return (
          <section key={cat}>
            <div className="flex items-center justify-between mb-4">
                          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
              {cat}s
            </h2 >
        
            </div>


            <div className="flex gap-6 overflow-x-auto pb-6">
              {filtered.map((exp: any) => (
                <ExperienceCard 
                  key={exp.id} 
                  experience={exp} 
                  onDelete={() => removeExp(exp.id)} 
                />
              ))}
            </div>
          </section>
        );
      })}

<div className="fixed bottom-8  centered w-full flex justify-center mb-4">
      <p className="text-gray-500 "> <SocialDock /> </p> 
      </div>

    </div>
  );
}