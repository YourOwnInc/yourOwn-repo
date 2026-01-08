// apps/client/src/components/InteractivePreview.tsx
import { usePortfolioStore } from "../domain/usePortfolioStore";
import { PortfolioRenderer } from "../Features/preview/components/PreviewRenderer";

export const InteractivePreview = () => {
  // 1. Consume the live state from your store
  const { model, upsertPlacement } = usePortfolioStore();

  // 2. The handler that "knows" something changed
  const onDragEnd = (result: any) => {
    const { draggableId, destination } = result;
    if (!destination) return;

    // Update the placement in the store
    // This function will trigger a state change, which re-renders this component
    upsertPlacement({
      experienceId: draggableId,
      slotId: destination.droppableId,
      patternId: "exp.card.v1" // Keep existing or update
    });
  };

  if (!model) return null;

  return (
    <div className="preview-editor-wrapper">
      {/* Pass the live model to the renderer. 
          As placements change in 'model', the Renderer updates instantly.
      */}
      <PortfolioRenderer {...model} />
    </div>
  );
};