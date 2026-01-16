import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "../UI/tabs";
import  Plus  from "lucide-react";
import { ManifestData } from "../../../domain/types";

interface PortfolioNavProps {
  manifest: ManifestData;
}

export const PortfolioNav = ({ manifest }: PortfolioNavProps) => {
  const navigate = useNavigate();
  const { LayoutName = "home" } = useParams();

  const handleTabChange = (value: string) => {
    navigate(`/preview/${value}`);
  };

  const handleAddNewTab = () => {
    // This is where you'll trigger your "Create Page" mutation later
    console.log("Triggering new page creation...");
  };

  return (
    <nav className="flex items-center gap-2">
      <Tabs value={LayoutName} onValueChange={handleTabChange}>
        <TabsList>
          {manifest.tabs.map((tab) => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.name} 
              activeValue={LayoutName} 
              onClick={handleTabChange}
            >
              {tab.name}
            </TabsTrigger>
          ))}
          
          {/* Integrated Plus Button */}
          <button
            onClick={handleAddNewTab}
            className="ml-1 flex h-8 w-8 items-center justify-center rounded-md border border-dashed border-gray-400 hover:bg-gray-200 transition-colors"
            title="Add new page"
          >
           
          </button>
        </TabsList>
      </Tabs>
    </nav>
  );
};