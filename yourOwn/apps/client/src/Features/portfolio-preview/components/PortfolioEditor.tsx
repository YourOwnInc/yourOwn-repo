// features/portfolio-preview/components/PortfolioEditor.tsx
import { useEffect, useState } from "react";
import { PortfolioRenderer } from "./PreviewRenderer";
import { PortfolioViewer } from "./PortfolioViewer";
import { AddTabModal } from "./AddTabModal";
import { AddExperienceModal } from "./AddExperienceModal";
import { useCreateTab } from "../hooks/useCreateTab";

import { useSyncLayout } from "../hooks/useSyncLayout";
import { Placement, HydratedLayoutData, PortfolioViewerProps } from "../types/portoflio.types";
import { usePortfolioManifest } from "../hooks/usePortfolioManifest";
import { useUser } from "../../../core/auth/UserContext";


import { EditorProvider } from "../context/EditorContext";

export const PortfolioEditor = ({ contentData, manifest }: PortfolioViewerProps) => {
  const { sessionId } = useUser();
  const [isAddTabOpen, setIsAddTabOpen] = useState(false);
  const [activeSlotId, setActiveSlotId] = useState<string | null>(null);

  const createTabMutation = useCreateTab(sessionId);

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

  const handleAddTab = () => {
    setIsAddTabOpen(true);
  };

  const handleAddExperience = (slotId: string) => {
    setActiveSlotId(slotId);
  }

  const handleModalSubmit = (data: { layoutName: string; template: string }) => {
    createTabMutation.mutate(data, {
      onSuccess: () => {
        setIsAddTabOpen(false);
      }
    });
  };

  // Find original layout structure from contentData
  const syncMutation = useSyncLayout(contentData.id);

  const handleExperienceSubmit = (data: { slotId: string; experienceId: string; patternId: string }) => {
    console.log("Saving placement", data);

    // Construct the payload to send to the sync endpoint
    // It requires all existing slots and all existing placements + the new one
    const newPlacement = {
      slotId: data.slotId,
      experienceId: data.experienceId,
      patternId: data.patternId,
      profileId: "" // typically unused for experiences, used for identity
    };

    syncMutation.mutate({
      slots: contentData.slots,
      placements: [...contentData.placements, newPlacement]
    }, {
      onSuccess: () => {
        setActiveSlotId(null);
      }
    });
  };

  return (
    <EditorProvider value={{ isEditing: true, onAddTab: handleAddTab, onAddExperience: handleAddExperience }}>
      <div className="editor-container relative h-full w-full border-2 border-dashed border-blue-400">
        <div className="editor-badge absolute top-0 right-0 z-50 bg-blue-500 text-white px-2 py-1 text-xs">
          EDIT MODE
        </div>

        {/* We render Viewer inside EditorProvider so UI patterns access Editor state */}
        <PortfolioViewer contentData={contentData} manifest={manifest} />

        <AddTabModal
          isOpen={isAddTabOpen}
          onClose={() => setIsAddTabOpen(false)}
          onSubmit={handleModalSubmit}
          isLoading={createTabMutation.isPending}
        />

        <AddExperienceModal
          isOpen={!!activeSlotId}
          slotId={activeSlotId}
          experienceLibrary={contentData.experienceLibrary}
          onClose={() => setActiveSlotId(null)}
          onSubmit={handleExperienceSubmit}
          isLoading={syncMutation.isPending}
        />
      </div>
    </EditorProvider>
  );
};