// features/portfolio-preview/components/PortfolioEditor.tsx
import { useEffect } from "react";
import { PortfolioRenderer } from "./PreviewRenderer";

import { useSyncLayout } from "../hooks/useSyncLayout";
import { Placement, HydratedLayoutData, PortfolioViewerProps } from "../types/portoflio.types";
import { usePortfolioManifest } from "../hooks/usePortfolioManifest";
import { useUser } from "../../../core/auth/UserContext";


export const PortfolioEditor = ({ contentData, manifest }: PortfolioViewerProps) => {

//   // Use the store to manage the 'Draft' state
//   const { layout, experiences, setModel, upsertPlacement } = usePortfolioStore();
//   const layoutId = initialData.layout.id;
//   const syncMutation = useSyncLayout(layoutId);

//   // 1. Initialize the store with server data on mount
//   useEffect(() => {
//     if (initialData) {
//       // Assuming setModel handles the mapping of PortfolioModel to store state
//       setModel(initialData);
//     }
//   }, [initialData, setModel]);

//   // 2. Handle layout changes (e.g., changing a pattern or swapping an experience)
//   const onHandleChange = (newPlacement: Placement) => {
//     upsertPlacement(newPlacement); // Local update (Instant UI feedback)
    
//     // Optional: Sync to DB. In a stable editor, you might want a 'Save' button 
//     // instead of syncing on every single change to reduce API load.
//     if (layout) {
//         syncMutation.mutate({ ...layout, placements: [...layout.placements, newPlacement] });
//     }
//   };

//   // Guard: Don't render if the store hasn't initialized yet
//   if (!layout) return <div>Initializing Editor...</div>;

  return (
    <div className="editor-container relative border-2 border-dashed border-blue-400">
      <div className="editor-badge absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 text-xs">
        EDIT MODE
      </div>
      
      {/* Pass the STORE state (the draft) to the renderer, not the initialData */}
      {/* <PortfolioRenderer layout={layout} experiences={experiences} /> */}
      
      {/* Future: Add Drag-and-Drop or Pattern Selector UI here */}
    </div>
  );
};