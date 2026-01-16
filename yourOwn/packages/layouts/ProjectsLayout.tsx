export const Projects: React.FC<{ slots: Record<string, React.ReactNode> }> = ({ slots }) => (
    <div className="min-h-screen bg-black text-white px-6 py-16 md:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Header Slot: For Title and Description */}
        <div className="mb-16">
          {slots["slot-header"]}
        </div>

        {/* Project Grid: A responsive grid of individual project slots */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {slots["slot-p1"]}
          {slots["slot-p2"]}
          {slots["slot-p3"]}
        </div>
      </div>
    </div>
);