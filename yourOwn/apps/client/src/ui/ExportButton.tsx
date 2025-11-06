// apps/client/src/ui/ExportButton.tsx

import { PortfolioModel } from "../domain/types";
import { exportSectionHTML } from "../export/exportSection";

export default function ExportButton({ model }: { model: PortfolioModel }) {
  function onExport() {
    const html = exportSectionHTML(model);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio-section.html";
    a.click();
    URL.revokeObjectURL(url);
  }
  return <button onClick={onExport}>Export</button>;
}
