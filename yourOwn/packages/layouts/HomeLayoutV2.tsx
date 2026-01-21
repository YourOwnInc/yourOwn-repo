// src/layouts/HomeLayout.tsx
import React from "react";

export const HomeLayoutV2: React.FC<{ slots: Record<string, React.ReactNode> }> = ({ slots }) => (
  <div className="min-h-screen bg-[#c5e8c8] text-black selection:bg-cyan-500/30">
    {/* Global Grain/Noise Overlay for texture */}
    <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

    <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* HERO SECTION: Taking prominence */}
        <header className="lg:col-span-12 mb-12">
          {slots["hero"]}
        </header>

        {/* PRIMARY CONTENT: The deep-dive projects */}
        <section className="lg:col-span-8 space-y-16">
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-8 flex items-center gap-4">
            <span className="h-px w-8 bg-slate-800"></span> Selected Architecture
          </h2>
          {slots["primary-experience"]}
          {slots["secondary-focus"]}
        </section>

        {/* SIDEBAR: Context and Connectivity */}
        <aside className="lg:col-span-4 space-y-12">

          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-6">Connect</h3>
            {slots["socials"]}
          </div>
        </aside>
      </div>
    </main>

    {/* MINIMAL FOOTER */}
    <footer className="border-t border-slate-900 mt-20 py-12 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center text-slate-600">
        {slots["footer"]}
      </div>
    </footer>
  </div>
);