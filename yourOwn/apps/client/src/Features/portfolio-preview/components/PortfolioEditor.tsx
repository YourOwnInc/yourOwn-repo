import { useEffect } from "react";
import { PortfolioRenderer } from "./PreviewRenderer";
import { useEditorStore } from "../store/useEditorStore";
import { useSyncLayout } from "../hooks/useSyncLayout";
import { HydratedLayoutDTO } from "../../../domain/types";

interface PortfolioEditorProps {
  initialData: HydratedLayoutDTO;
}

export const PortfolioEditor = ({ initialData }: PortfolioEditorProps) => {
  const { 
    layoutUuid, 
    layoutName, 
    placements, 
    experienceLibrary, 
    setEditorData, 
    isDirty 
  } = useEditorStore();

  const syncMutation = useSyncLayout(layoutUuid || "");

  // 1. Sync server data to store on mount
  useEffect(() => {
    if (initialData) {
      setEditorData(initialData);
    }
  }, [initialData, setEditorData]);

  // 2. Automated sync when dirty (or use a 'Save' button)
  const handleSave = () => {
    syncMutation.mutate({
      placements,
    });
  };

  if (!layoutUuid) return <div>Initializing Editor Store...</div>;

  return (
    <div className="editor-view relative min-h-screen border-4 border-blue-500/30">
      {/* UI Controls Overlay */}
      <div className="fixed bottom-8 right-8 z-50 flex gap-4">
        {isDirty && (
          <button 
            onClick={handleSave}
            className="bg-green-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-green-700 transition"
          >
            {syncMutation.isLoading ? "Saving..." : "Save Changes"}
          </button>
        )}
      </div>

      {/* The Renderer now pulls from the STORE. 
        When updatePlacement is called, this will re-render instantly.
      */}
      <PortfolioRenderer 
        id={layoutUuid}
        layoutName={layoutName}
        placements={placements}
        experienceLibrary={experienceLibrary}
        slots={initialData.slots} // Slots stay constant from the initial load
      />
    </div>
  );
};