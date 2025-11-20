const BASE = "http://localhost:5000/api";

// Starts a session body and layout assigned to that session
export async function startSession() {
   const res = await fetch(`${BASE}/session/start`);
   if (!res.ok) throw new Error("getLayout failed");
   return res.json();
}


