import { SessionId, LayoutModel, Placement } from "../domain/types";
const BASE = "http://localhost:5000/api";

export async function getLayout(sessionId: SessionId): Promise<LayoutModel> {
  const res = await fetch(`${BASE}/layout/`);
  if (!res.ok) throw new Error("getLayout failed");
  return res.json();
}

export async function assignItem(sessionId: SessionId, placement: Placement): Promise<void> {
  const res = await fetch(`${BASE}/session/${sessionId}/layout/assign`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      "X-Session-Id": sessionId
     },
    body: JSON.stringify(placement),
  });
  if (!res.ok) throw new Error("assignSlot failed");
}

