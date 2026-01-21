// apps/client/src/ui/ExportButton.tsx

import { PortfolioModel } from "../lib/types";
import { exportSectionHTML } from "../Features/export/components/exportSection";

export default function ExportButton({ model }: { model: PortfolioModel }) {
  async function onExport() {
    const html = exportSectionHTML(model);
    const res = await fetch("http://localhost:5000/api/export/", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        html: html,
      }), 
    });
    if (!res.ok) 
      throw new Error("Failed to generate zip");

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    // Trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio.zip";
    a.click();
    URL.revokeObjectURL(url);
  }
  return <button onClick={onExport}>Export</button>;
}