import { ExperienceDTO, SessionId } from "../domain/types";
const BASE = "http://localhost:5000/api";

export async function createExperience(
  sessionId: SessionId,
  payload: Omit<ExperienceDTO, "id" | "sessionId">
): Promise<ExperienceDTO> {
  const res = await fetch(`${BASE}/experience`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Session-Id": sessionId },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("createExperience failed");
  return res.json();
}



export async function listExperiences(sessionId: SessionId): Promise<ExperienceDTO[]> {
  const res = await fetch(`${BASE}/session/${sessionId}/experiences`);
  if (!res.ok) throw new Error("listExperiences failed");
  return res.json();
}


// Optional MVP+1
export async function updateExperience(id: string, payload: Partial<ExperienceDTO>): Promise<ExperienceDTO> {
  const res = await fetch(`${BASE}/experience/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("updateExperience failed");
  return res.json();
}

export async function deleteExperience(id: string): Promise<void> {
  const res = await fetch(`${BASE}/experience/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("deleteExperience failed");
}