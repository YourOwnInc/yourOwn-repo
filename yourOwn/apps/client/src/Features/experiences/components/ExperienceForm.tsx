// apps/client/src/ui/ExperienceForm.tsx

import { useState } from "react";
import { ExperienceDTO } from "../../../shared/lib/types";

type FormPayload = Omit<ExperienceDTO, "id" | "sessionId">;

export default function ExperienceForm({
  initial,
  onSubmit,
  onCancel,
}: {
  initial?: Partial<FormPayload>;
  onSubmit: (payload: FormPayload) => Promise<void> | void;
  onCancel?: () => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [start, setStart] = useState(initial?.start ?? "");
  const [end, setEnd] = useState(initial?.end ?? "");
  const [type, setType] = useState<FormPayload["type"]>(initial?.type ?? "project");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();


        await onSubmit({ 
          title, 
          summary, 
          start: start ? new Date(start).toISOString() : undefined  , 
          end: end ? new Date(end).toISOString() : undefined, 
          type});
      }}
    >
      <div><label>Title <input value={title} onChange={(e) => setTitle(e.target.value)} required /></label></div>
      <div><label>Summary <textarea value={summary} onChange={(e) => setSummary(e.target.value)} /></label></div>
      <div style={{ display: "flex", gap: 8 }}>
        <label>Start <input type="date" value={start} onChange={(e) => setStart(e.target.value)} /></label>
        <label>End <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} /></label>
      </div>
      <div>
        <label>type{" "}
          <select value={type} onChange={(e) => setType(e.target.value as any)}>
            <option value="project">Project</option>
            <option value="internship">Internship</option>
            <option value="job">Job</option>
            <option value="volunteering">Volunteering</option>
          </select>
        </label>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button type="submit">Save</button>
        {onCancel ? <button type="button" onClick={onCancel}>Cancel</button> : null}
      </div>
    </form>
  );
}
