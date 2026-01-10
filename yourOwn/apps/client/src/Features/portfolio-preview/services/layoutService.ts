// src/features/portfolio-preview/services/layoutApiService.ts
const BASE = "http://localhost:5000/api";

/**
 * Fetches the high-level skeleton (Profile + Tab Names) for a session.
 */
export async function fetchPortfolioManifest(sessionId: string) {
  const res = await fetch(`${BASE}/sessions/${sessionId}/manifest`);
  if (!res.ok) throw new Error("Failed to fetch portfolio manifest");
  return res.json();
}

/**
 * Fetches a specific tab with its layout and all associated experiences.
 */
export async function fetchHydratedPage(layoutName: string) {
  // We use the JWT in the header for auth, so sessionId in URL is often optional
  // depending on your specific route setup.
  const res = await fetch(`${BASE}/layouts/hydrate/${layoutName}`);
  if (!res.ok) throw new Error(`Failed to fetch page: ${layoutName}`);
  return res.json();
}

/**
 * Syncs the entire layout design (slots and placements) to the database.
 */
export async function syncLayout(layoutId: string, payload: { slots: any[], placements: any[] }) {
  const res = await fetch(`${BASE}/layouts/${layoutId}/sync`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Syncing layout failed");
  return res.json();
}
