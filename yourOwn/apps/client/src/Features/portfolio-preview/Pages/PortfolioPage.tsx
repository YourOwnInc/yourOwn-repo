import React, { useState,  } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {  useHydratedPage } from "../hooks/useHydratedPage";
import { usePortfolioManifest } from "../hooks/usePortfolioManifest";
import {PortfolioViewer} from "../components/PortfolioViewer";
import {PortfolioEditor} from "../components/PortfolioEditor";
import { useUser } from "../../../contexts/UserContext";
import { PortfolioNav } from "../components/PortfolioNav";
import { TabsList, TabsTrigger } from "../UI/tabs";


export const PortfolioPage = () => {
    /// find out best way to get layoutName. probally from the navigation
  const { LayoutName = "home" } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const { sessionId } = useUser();
  
  const navigate = useNavigate();
  const { data: manifest, isLoading: manifestLoading } = usePortfolioManifest(sessionId);
  const { data: hydratedData, isLoading: layoutLoading } = useHydratedPage(LayoutName);

  // Handle the "First Time/Empty" state if no hydrated data exists
  const hasNoContent = !layoutLoading && !hydratedData;

  console.log("hydrated Data in main page", hydratedData);


//   // Find the UUID from the manifest tabs for syncing later
//   const currentTab = manifest?.tabs.find(t => t.name === LayoutName);
//   const layoutUuid = currentTab?.id;

  if (manifestLoading || layoutLoading) return <div>Loading Portfolio...</div>;
  if (!hydratedData) return <div>No layout found.</div>;
  
const handleAddNewPage = () => {
    // Logic for adding a new tab to the manifest
    console.log("Create new page logic here");
  };

  if (manifestLoading || layoutLoading) return <div>Loading...</div>;

  return (
    <div className="portfolio-container">
     <header className="p-4 border-b flex items-center justify-between">
        {/* The Page just passes the manifest and lets the Nav handle itself */}
        {manifest && <PortfolioNav manifest={manifest} />}
        
        <button 
          onClick={() => setIsEditMode(!isEditMode)}
          className="text-sm px-3 py-1 bg-secondary rounded-md"
        >
          {isEditMode ? "Preview" : "Edit"}
        </button>
      </header>

      <main className="flex-grow ">
        {hasNoContent ? (
          <div className="flex flex-col items-center justify-center h-full p-20">
            <h2 className="text-xl font-bold">New Page: {LayoutName}</h2>
            <p>This page is empty. Start adding components!</p>
            <button className="mt-4 bg-primary text-white p-2 rounded">Initialize Page</button>
          </div>
        ) : isEditMode ? (
          <PortfolioEditor initialData={hydratedData} />
        ) : (
          <PortfolioViewer key={LayoutName} data={hydratedData} />
        )}
      </main>
    </div>
  );
};