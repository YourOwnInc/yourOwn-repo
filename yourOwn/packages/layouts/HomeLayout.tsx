export const Home: React.FC<{ slots: Record<string, React.ReactNode> }> = ({ slots }) => (
  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-8 min-h-screen bg-[#0a0a0a] text-zinc-100">
    {/* MAIN HERO: Top on mobile, Left 8-cols on desktop */}
    <div className="md:col-span-8 md:row-span-2 overflow-hidden bg-zinc-900/50 rounded-2xl border border-zinc-800/80 backdrop-blur-sm shadow-2xl transition-all hover:border-zinc-700/80 p-6 flex flex-col">
      {slots["main"] ? slots["main"] : <div className="text-zinc-500 m-auto">Add your main content here...</div>}
    </div>

    {/* SIDEBAR ITEMS: Stays on side on desktop */}
    <div className="md:col-span-4 space-y-8 flex flex-col justify-start">
      <div className="min-h-64 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 p-6 shadow-xl backdrop-blur-sm flex flex-col">
        {slots["slot-1"] || <div className="text-zinc-500 m-auto">Slot 1</div>}
      </div>
      <div className="min-h-64 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 p-6 shadow-xl backdrop-blur-sm flex flex-col">
        {slots["slot-2"] || <div className="text-zinc-500 m-auto">Slot 2</div>}
      </div>
    </div>

    {/* FOOTER STRIP: Full width desktop */}
    <div className="md:col-span-12 min-h-32 mt-8 rounded-2xl border-t border-zinc-800/80 bg-zinc-950/80 backdrop-blur pb-4 pt-8 px-8 flex items-center justify-between shadow-2xl">
      {slots["footer"] || <div className="text-zinc-500 mx-auto">Footer Section</div>}
    </div>
  </div>
);