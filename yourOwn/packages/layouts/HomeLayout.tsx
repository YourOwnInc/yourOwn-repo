export const Home: React.FC<{ slots: Record<string, React.ReactNode> }> = ({ slots }) => (
  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 min-h-screen">
    {/* MAIN HERO: Top on mobile, Left 8-cols on desktop */}
    <div className="md:col-span-8 md:row-span-2 border text-black overflow-hidden bg-white shadow-sm">
      {slots["main"] }
    </div>

    {/* SIDEBAR ITEMS: Stays on side on desktop */}
    <div className="md:col-span-4 space-y-6">
      <div className="h-64 border text-black bg-gray-50">{slots["slot-1"]}</div>
      <div className="h-64 border text-black bg-gray-50">{slots["slot-2"]}</div>
    </div>

    {/* FOOTER STRIP: Full width desktop */}
    <div className="md:col-span-12 h-32 border text-white bg-black text-white">
      {slots["footer"]}
    </div>
  </div>
);