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
    <div className="flex h-screen w-full overflow-hidden">
      <aside className="w-80 shrink-0 h-full">
     
    {/* Navigation stays at the top level so it's always reachable */}
        {manifest && <PortfolioNav manifest={manifest} />}
        {profileData && (
          <PortfolioRenderer 
            {...profileData} 
            // We pass the manifest as an extra prop so the Nav pattern can consume i
          />
        )}
        
  
      </aside>
      

      <main className="flex-grow overflow-y-auto bg-slate-50">
        <PortfolioRenderer {...contentData} />
      </main>
    </div>
  );
};