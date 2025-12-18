 import { ExperienceDTO, SessionId } from "../domain/types";
const BASE = "http://localhost:5000/api";
export async function createExperience(sessionId: string, payload: any) {
  const res = await fetch(`${BASE}/experiences`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Session-Id": sessionId,
    },
    body: JSON.stringify(payload),
  });

  // surface server JSON errors so you don't think it's a CORS issue
  let data: any = null;
  const text = await res.text();
  try { data = text ? JSON.parse(text) : null; } catch { /* leave as text */ }

  if (!res.ok) {
    const msg =
      data?.error?.message ||
      (Array.isArray(data?.error?.details) ? JSON.stringify(data.error.details) : text) ||
      `HTTP ${res.status}`;
    throw new Error(`createExperience failed: ${msg}`);
  }
  return data;
}



export async function listExperiences(sessionId: SessionId): Promise<ExperienceDTO[]> {
  const res = await fetch(`${BASE}/experiences`, {
    method: "GET"
  });
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