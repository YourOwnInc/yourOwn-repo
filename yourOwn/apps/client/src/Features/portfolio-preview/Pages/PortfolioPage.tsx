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
import { BaseShellProps } from "../types/shell.types";
import { SplitPaneShell } from "../shells/SplitPaneShell";
import { PortfolioRenderer } from "../components/PreviewRenderer";


// src/features/portfolio-preview/pages/PortfolioPage.tsx
export const PortfolioPage = () => {
  const { LayoutName = "home" } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [shellType, setShellType] = useState<"standard" | "split">("split");
  const { sessionId } = useUser();

  const { data: manifest, isLoading: manifestLoading } = usePortfolioManifest(sessionId);
  const { data: contentData, isLoading: layoutLoading } = useHydratedPage(LayoutName);

  if (manifestLoading || layoutLoading) return <div>Loading...</div>;
  if (!contentData || !manifest) return <div>No layout found.</div>;


  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* GLOBAL ORCHESTRATION HEADER */}
      {/* <header className="p-2 border-b flex items-center justify-between bg-white z-50">
        <div className="flex items-center gap-4">
        
         
          
          <select 
            className="text-xs border rounded p-1"
            onChange={(e) => setShellType(e.target.value as any)}
            value={shellType}
          >
            <option value="standard">Standard Layout</option>
            <option value="split">Side Profile Layout</option>
          </select>
        </div>
        
        <button onClick={() => setIsEditMode(!isEditMode)}>
          {isEditMode ? "Preview" : "Edit"}
        </button>
      </header> */}

      {/* SHELL SELECTION */}
      <div className="flex-grow overflow-hidden">
      
        {isEditMode ? (
         <PortfolioEditor contentData={contentData} manifest={manifest}/>
        ) : (
              <PortfolioViewer contentData={contentData} manifest={manifest}  />
  
        )}
      </div>
    </div>
  );
};