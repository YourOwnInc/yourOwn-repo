// apps/client/src/ui/SlotPicker.tsx

import { useMemo, useState } from "react";
import { ExperienceDTO, PatternId, Placement, Slot } from "../domain/types";
import { PATTERNS } from "../patterns/PATTERNS";

export default function SlotPicker({
  slot,
  experiences,
  onSave,
  onClose,
}: {
  slot: Slot;
  experiences: ExperienceDTO[];
  onSave: (p: Placement) => Promise<void> | void;
  onClose: () => void;
}) {
  const [experienceId, setExperienceId] = useState<string>(experiences[0]?.id ?? "");
  const patternIds = useMemo(() => Object.keys(PATTERNS) as PatternId[], []);
  const [patternId, setPatternId] = useState<PatternId>(patternIds[0] ?? "exp.card.v1");

  return (
    <div style={{ border: "1px solid #ccc", padding: 12 }}>
      <h3>Assign Slot {slot.id}</h3>

      <div>
        <label>Experience{" "}
          <select value={experienceId} onChange={(e) => setExperienceId(e.target.value)}>
            {experiences.map((e) => <option key={e.id} value={e.id}>{e.title}</option>)}
          </select>
        </label>
      </div>

      <div>
        <label>Pattern{" "}
          <select value={patternId} onChange={(e) => setPatternId(e.target.value as PatternId)}>
            {patternIds.map((id) => <option key={id} value={id}>{id}</option>)}
          </select>
        </label>
      </div>

      {/* TODO: optional per-pattern props editor */}

      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button
          onClick={async () => {
            if (!experienceId) return;
            await onSave({ slotId: slot.id, experienceId, patternId });
            onClose();
          }}
        >
          Save
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
