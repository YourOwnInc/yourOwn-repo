import React, { useState,  } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {  useHydratedPage } from "../hooks/useHydratedPage";
import { usePortfolioManifest } from "../hooks/usePortfolioManifest";
import {PortfolioViewer} from "../components/PortfolioViewer";
import {PortfolioEditor} from "../components/PortfolioEditor";
import { useUser } from "../../../core/auth/UserContext";
import { PortfolioNav } from "../components/PortfolioNav";
import { TabsList, TabsTrigger } from "../UI/tabs";
import { BaseShellProps } from "../types/shell.types";
import { SplitPaneShell } from "../shells/SplitPaneShell";
import { PortfolioRenderer } from "../components/PreviewRenderer";

// src/features/portfolio-preview/pages/PortfolioPage.tsx
import { ArrowLeft, Edit3, Eye } from "lucide-react"; // Import icons
import { Link } from "react-router-dom";

export const PortfolioPage = () => {
  const { LayoutName = "home" } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const { sessionId } = useUser();

  const { data: manifest, isLoading: manifestLoading } = usePortfolioManifest(sessionId);
  const { data: contentData, isLoading: layoutLoading } = useHydratedPage(LayoutName);

  if (manifestLoading || layoutLoading) return <div>Loading...</div>;
  if (!contentData || !manifest) return <div>No layout found.</div>;

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden relative">
      
      {/* APP LAYER: Navigation Back & Mode Toggle */}
      <div className="absolute top-4 left-4 z-[100] flex items-center gap-4">
        {/* Back to Landing Icon */}
        <Link 
          to="/landing" 
          className="p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all text-white shadow-lg"
          title="Back to Landing"
        >
          <ArrowLeft size={20} />
        </Link>

        {/* Edit/View Toggle - Minimalist style for your aesthetic */}
        <button 
          onClick={() => setIsEditMode(!isEditMode)}
          className="flex items-center gap-2 px-3 py-1.5 bg-black border border-white/20 rounded-full text-xs font-medium text-white hover:border-white/50 transition-all shadow-lg"
        >
          {isEditMode ? (
            <><Eye size={14} /> View Mode</>
          ) : (
            <><Edit3 size={14} /> Edit Mode</>
          )}
        </button>
      </div>

      {/* RENDER LAYER: Shell Selection */}
      <div className="flex-grow overflow-hidden">
        {isEditMode ? (
          <PortfolioEditor contentData={contentData} manifest={manifest}/>
        ) : (
          <PortfolioViewer contentData={contentData} manifest={manifest} />
        )}
      </div>
    </div>
  );
};