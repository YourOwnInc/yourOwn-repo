// @yourown/ui-patterns/src/patterns/ProjectGrid.tsx
import { ProjectCard } from "../projects/ProjectCard";

export const ProjectGrid = ({ data }: { data: any }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {data.projects.map((project: any) => (
        <ProjectCard key={project.id} data={project.content.summary} />
      ))}
    </div>
  );
};