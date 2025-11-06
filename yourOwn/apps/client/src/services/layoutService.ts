import { SessionId, LayoutModel, Placement } from "../domain/types";
const BASE = "http://localhost:5000";

export async function getLayout(sessionId: SessionId): Promise<LayoutModel> {
  const res = await fetch(`${BASE}/session/${sessionId}/layout`);
  if (!res.ok) throw new Error("getLayout failed");
  return res.json();
}

export async function assignSlot(sessionId: SessionId, placement: Placement): Promise<void> {
  const res = await fetch(`${BASE}/session/${sessionId}/layout/assign`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(placement),
  });
  if (!res.ok) throw new Error("assignSlot failed");
}
