import { PatternProps } from "../interfaces";

export const GenericCard = ({ data, className }: PatternProps) => {
  return (
    <div className={`group relative bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 hover:bg-zinc-800/80 hover:border-zinc-700/80 transition-all duration-300 shadow-lg backdrop-blur-md overflow-hidden ${className ?? ""}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative z-10 flex flex-col h-full gap-3">
        <h3 className="text-xl font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors">
          {data?.title ?? "Untitled Content"}
        </h3>
        {data?.organization && (
          <div className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
            {data.organization}
          </div>
        )}
        {(data?.summaryShort || data?.summary) && (
          <p className="text-zinc-400 text-sm leading-relaxed mt-2 line-clamp-3">
            {data.summaryShort || data.summary}
          </p>
        )}
        <div className="mt-auto pt-6">
          <span className="inline-flex items-center px-2 py-1 rounded-md bg-zinc-800/50 text-[10px] uppercase font-bold tracking-widest text-zinc-500 border border-zinc-700/50">
            {data?.type ?? "Generic Card"}
          </span>
        </div>
      </div>
    </div>
  );
}