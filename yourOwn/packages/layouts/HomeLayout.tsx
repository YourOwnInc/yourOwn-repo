// packages/layouts/HomeLayout.tsx
import React from 'react';

interface HomeProps {
  slots: Record<string, React.ReactNode>;
}

export const Home: React.FC<HomeProps> = ({ slots }) => (
  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 min-h-screen">
    <div className="md:col-span-8 border bg-white">
      {slots["main"] || <div>Main Content</div>}
    </div>
    <div className="md:col-span-4 space-y-6">
      <div className="h-64 border bg-gray-50">{slots["slot-1"]}</div>
      <div className="h-64 border bg-gray-50">{slots["slot-3"]}</div>
    </div>
    <div className="md:col-span-12 h-32 bg-black text-white">
      {slots["footer"]}
    </div>
  </div>
);

/**
 * These constants are used by the YourOwn Sync Engine 
 * and are preserved in the exported code for reference.
 */
(Home as any).slotDefinitions = [
  { clientSlotId: "main", area: "header" },
  { clientSlotId: "slot-1", area: "sidebar" },
  { clientSlotId: "slot-3", area: "sidebar" },
  { clientSlotId: "footer", area: "footer" },
];