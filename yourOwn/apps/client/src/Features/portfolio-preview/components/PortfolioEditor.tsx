// features/portfolio-preview/components/PortfolioEditor.tsx
import { useSyncLayout } from "../hooks/useSyncLayout";
import { useHydratedPage } from "../hooks/useHydratedPage";
import { useEffect } from "react";
import { PortfolioRenderer } from "./PreviewRenderer";

export const PortfolioEditor = ({ layoutName }: { layoutName: string }) => {
  const { data: serverData } = useHydratedPage(layoutName);
  const { model, setModel, upsertPlacement } = usePortfolioStore();
  const syncMutation = useSyncLayout();

  // Sync server data to local store on load
  useEffect(() => {
    if (serverData) setModel(serverData);
  }, [serverData]);

  const onHandleChange = (newPlacement) => {
    upsertPlacement(newPlacement); // Updates UI instantly
    syncMutation.mutate(model);    // Saves to DB in background
  };

  return (
    <div className="editor-overlay-controls">
      <PortfolioRenderer layout={model.layout} experiences={model.experiences} />
      {/* Add your Drag-and-Drop overlays here */}
    </div>
  );
};