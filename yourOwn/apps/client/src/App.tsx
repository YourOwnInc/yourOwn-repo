// apps/client/src/App.tsx

import { useState } from "react";
import PortfolioBuilder from "./ui/PortfolioBuilder";
import ExperiencesPage from "./ui/ExperiencesPage";

const SESSION_ID = "dev-session-1"; // TODO: read from auth/session store later

export default function App() {
  const [tab, setTab] = useState<"main" | "experiences">("main");

  return (
    <div style={{ padding: 16 }}>
      <nav style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setTab("main")} disabled={tab === "main"}>Main</button>
        <button onClick={() => setTab("experiences")} disabled={tab === "experiences"}>Experiences</button>
      </nav>

      {tab === "main" ? (
        <PortfolioBuilder sessionId={SESSION_ID} />
      ) : (
        <ExperiencesPage sessionId={SESSION_ID} />
      )}
    </div>
  );
}
