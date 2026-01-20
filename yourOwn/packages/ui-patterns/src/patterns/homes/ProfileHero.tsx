// src/patterns/ProfileHero.tsx
import { PatternProps } from "../../interfaces";

export const ProfileHero = ({ data, className }: PatternProps) => {
  return (
    <section className={`flex flex-col lg:flex-row items-center gap-12 py-16 lg:py-24 ${className ?? ""}`}>
      {/* Avatar with Architectural Frame */}
      <div className="relative group flex-shrink-0">
        <div className="absolute -inset-1 bg-gradient-to-tr from-cyan-600 to-blue-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-700"></div>
        <img 
          src={data?.avatarUrl ?? "https://via.placeholder.com/150"} 
          alt={data?.displayName ?? "User"}
          className="relative w-44 h-44 lg:w-56 lg:h-56 rounded-full object-cover border border-slate-800 shadow-2xl"
        />
      </div>

      <div className="flex-1 text-center lg:text-left">
        <h1 className="text-4xl lg:text-6xl font-bold text-slate-100 tracking-tight mb-2">
          {data?.displayName ?? "Untitled Profile"}
        </h1>
        <p className="text-lg lg:text-xl text-cyan-400 font-medium tracking-wide mb-6">
          {data?.headline ?? "Professional Role"}
        </p>
        <p className="text-slate-400 text-base lg:text-lg max-w-2xl leading-relaxed mb-8">
          {data?.bioShort ?? "No biography provided."}
        </p>
        
        {/* Social Links from the JSON Metadata */}
        <div className="flex justify-center lg:justify-start gap-5">
          {data?.links && Object.entries(data.links).map(([key, url]) => (
            url && (
              <a key={key} href={url as string} target="_blank" className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 hover:text-cyan-400 transition-colors">
                {key}
              </a>
            )
          ))}
        </div>
      </div>
    </section>
  );
}