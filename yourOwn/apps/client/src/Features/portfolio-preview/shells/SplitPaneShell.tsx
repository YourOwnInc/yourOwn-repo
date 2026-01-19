// src/features/portfolio-preview/shells/SplitPaneShell.tsx
import React from "react";
import { PortfolioViewer } from "../components/PortfolioViewer";
import { PortfolioEditor } from "../components/PortfolioEditor";
import { useHydratedPage } from "../hooks/useHydratedPage";
import { BaseShellProps } from "../types/shell.types";

import { PortfolioRenderer } from "../components/PreviewRenderer";
import { PortfolioNav } from "../components/PortfolioNav";

// src/features/portfolio-preview/shells/SplitPaneShell.tsx
export const SplitPaneShell = ({ contentData, manifest }: BaseShellProps) => {
  const { data: profileData, isLoading: profileLoading } = useHydratedPage("profile-sidebar");

  if (profileLoading) return <div>Loading...</div>;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <aside className="w-80 shrink-0 h-full">
        {profileData && manifest && (
          <PortfolioRenderer 
            {...profileData} // Spreads id, layoutName, slots, placements, etc.
            manifest={manifest} // Completes the "package"
          />
        )}
      </aside>

      <main className="flex-grow overflow-y-auto bg-slate-50">
        {/* Main content might also need the manifest for its own nav patterns */}
        {manifest && <PortfolioRenderer {...contentData} manifest={manifest} />}
      </main>
    </div>
  );
};