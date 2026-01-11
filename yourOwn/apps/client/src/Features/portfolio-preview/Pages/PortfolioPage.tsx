import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {  useHydratedPage } from "../hooks/useHydratedPage";
import { usePortfolioManifest } from "../hooks/usePortfolioManifest";
import {PortfolioViewer} from "../components/PortfolioViewer";
import {PortfolioEditor} from "../components/PortfolioEditor";
import { useUser } from "../../../contexts/UserContext";



export const PortfolioPage = () => {
    /// find out best way to get layoutName. probally from the navigation
  const { LayoutName = "home" } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const { sessionId } = useUser();

  const { data: manifest, isLoading: manifestLoading } = usePortfolioManifest(sessionId);
  const { data: hydratedData, isLoading: layoutLoading } = useHydratedPage(LayoutName);

  console.log("hydrated Data in main page", hydratedData);


//   // Find the UUID from the manifest tabs for syncing later
//   const currentTab = manifest?.tabs.find(t => t.name === LayoutName);
//   const layoutUuid = currentTab?.id;

  if (manifestLoading || layoutLoading) return <div>Loading Portfolio...</div>;
  if (!hydratedData) return <div>No layout found.</div>;

  return (
    <div className="portfolio-container">
      <header>
        {/* Navigation built from manifest.tabs */}
        <button onClick={() => setIsEditMode(!isEditMode)}>
          {isEditMode ? "View Live" : "Edit Layout"}
        </button>
      </header>

      <main>
        {isEditMode ? (
          <PortfolioEditor initialData={hydratedData} />
        ) : (
          <PortfolioViewer data={hydratedData} />
        )}
      </main>
    </div>
  );
};