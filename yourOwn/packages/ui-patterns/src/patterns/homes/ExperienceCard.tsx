// src/patterns/ExperienceDetailCard.tsx
import { PatternProps } from "../../interfaces";

export const ExperienceCard = ({ data, className }: PatternProps) => {
  return (
    <div className={`group bg-slate-900/40 border border-slate-800/60 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-500 ${className ?? ""}`}>
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500">
            {data?.type ?? "WORK"} — {data?.organization ?? "Organization"}
          </span>
          <h3 className="text-2xl font-bold text-slate-100 mt-1">
            {data?.roleTitle ?? data?.title ?? "Untitled Role"}
          </h3>
        </div>

        {/* Tech Stack Slot */}
        <div className="flex flex-wrap gap-2 md:justify-end">
          {data?.techStack?.map((tech: string) => (
            <span key={tech} className="px-2.5 py-1 text-[9px] font-bold bg-slate-800 text-slate-400 border border-slate-700 rounded uppercase tracking-widest">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Conditional Narrative Grid */}
      {(data?.problemStatement || data?.solutionDetails) && (
        <div className="grid md:grid-cols-2 gap-8 py-6 my-6 border-y border-slate-800/50">
          {data.problemStatement && (
            <div className="space-y-2">
              <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Problem</h4>
              <p className="text-sm text-slate-400 leading-relaxed">{data.problemStatement}</p>
            </div>
          )}
          {data.solutionDetails && (
            <div className="space-y-2">
              <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Solution</h4>
              <p className="text-sm text-slate-400 leading-relaxed">{data.solutionDetails}</p>
            </div>
          )}
        </div>
      )}

      {/* Impact Bullets */}
      <ul className="space-y-3">
        {data?.impactBullets?.map((bullet: string, i: number) => (
          <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
            <div className="mt-1.5 h-1 w-1 rounded-full bg-cyan-500 shrink-0" />
            {bullet}
          </li>
        ))}
      </ul>
      
      <div className="mt-6 pt-4 border-t border-slate-800/30">
        <small className="text-[9px] font-bold uppercase tracking-widest text-slate-700">Pattern: Experience Detail</small>
      </div>
    </div>
  );
}