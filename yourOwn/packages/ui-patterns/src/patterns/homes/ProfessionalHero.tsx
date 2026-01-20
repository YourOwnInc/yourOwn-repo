// src/patterns/ProfessionalHero.tsx
import { PatternProps } from "../../interfaces";

export const ProfessionalHero = ({ data, className }: PatternProps) => {
  return (
    <div className={`relative group ${className ?? ""}`}>
      <div className="flex flex-col lg:flex-row items-end lg:items-center justify-between gap-8">
        <div className="max-w-3xl">
          <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter text-white mb-6">
            {data?.displayName}
          </h1>
          <p className="text-xl lg:text-2xl text-slate-400 font-light leading-relaxed">
            {data?.tagline ?? data?.headline}
          </p>
        </div>
        
        {/* Subtle Decorative Element */}
        <div className="hidden lg:block h-32 w-px bg-gradient-to-b from-transparent via-slate-800 to-transparent"></div>
        
        <div className="flex flex-col items-end gap-2">
            <span className="text-xs font-mono text-cyan-500 uppercase tracking-widest">Available for collaboration</span>
            <span className="text-slate-500 text-sm">{data?.location}</span>
        </div>
      </div>
    </div>
  );
}