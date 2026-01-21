// src/patterns/NarrativeCard.tsx
import { PatternProps } from "../../interfaces";

export const NarrativeCard = ({ data, className }: PatternProps) => {
  return (
    <div className={`relative group border-l border-slate-900 pl-8 lg:pl-12 hover:border-cyan-500/50 transition-colors duration-500 ${className ?? ""}`}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em]">
          <span>{data?.organization}</span>
          <span className="h-1 w-1 rounded-full bg-slate-800"></span>
          <span>{data?.roleTitle}</span>
        </div>
        
        <h3 className="text-3xl font-bold text-slate-100 group-hover:text-white transition-colors">
          {data?.title}
        </h3>

        <p className="text-slate-400 leading-relaxed max-w-2xl mb-4">
          {data?.summaryShort ?? data?.summary}
        </p>

        {/* The "Architecture" Detail */}
        {data?.problemStatement && (
          <div className="bg-slate-900/30 border border-slate-900 rounded-lg p-6 my-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-cyan-500 mb-2">The Architecture Challenge</h4>
            <p className="text-sm text-slate-400 italic">"{data.problemStatement}"</p>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          {data?.techStack?.map((tech: string) => (
            <span key={tech} className="text-[9px] font-bold text-slate-500 border border-slate-800 px-2 py-1 rounded">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}