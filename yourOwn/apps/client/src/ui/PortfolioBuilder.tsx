// apps/client/src/ui/PortfolioBuilder.tsx

import { useState } from "react";
import { usePortfolioStore } from "../domain/usePortfolioStore";
import { SessionId } from "../domain/types";
import { PATTERNS } from "../patterns.LEGACY/PATTERNS";
import SlotPicker from "./SlotPicker";
import ExportButton from "./ExportButton";

export default function PortfolioBuilder({ sessionId }: { sessionId: SessionId }) {
  const { loading, error, layout, experiences, model, upsertPlacement } = usePortfolioStore(sessionId);
  const [pickerSlotId, setPickerSlotId] = useState<string | null>(null);

  if (loading || !layout) return <div>Loading…</div>;
  if (error) return <div>Failed: {error}</div>;

  const bySlot = Object.fromEntries(layout.placements.map(p => [p.slotId, p]));
  const byId = Object.fromEntries(experiences.map(e => [e.id, e]));

  const pickerSlot = layout.slots.find(s => s.id === pickerSlotId) || null;

  return (
    <div>
      <h2>Portfolio Builder</h2>

      <div style={{ display: "grid", gap: 12 }}>
        {layout.slots.map((slot) => {
          const placement = bySlot[slot.id];
          if (!placement) {
            return (
              <button key={slot.id} onClick={() => setPickerSlotId(slot.id)}>
                + (slot {slot.id})
              </button>
            );
          }
          const Comp = PATTERNS[placement.patternId].component;
          const data = byId[placement.experienceId];
          return (
            <div key={slot.id} style={{ gridArea: slot.area }}>
              <Comp data={data}  />
            </div>
          );
        })}
      </div>

      {model && (
        <div style={{ marginTop: 16 }}>
          <ExportButton model={model} />
        </div>
      )}

      {pickerSlot && (
        <div style={{ marginTop: 16 }}>
          <SlotPicker
            slot={pickerSlot}
            experiences={experiences}
            onSave={upsertPlacement}
            onClose={() => setPickerSlotId(null)}
          />
        </div>
      )}
    </div>
  );
}
