import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { PortfolioRenderer, PortfolioRenderData } from "../../../../renderer/src/PortfolioRenderer";
// RendererLab.tsx

const SCENARIOS: Record<string, PortfolioRenderData> = {

  "Standard Profile": {
    layout: {
      id: "bento-v1",
      slots: [
        { id: "main", area: "header" },
        { id: "s1", area: "main" },
        { id: "s2", area: "main" },
      ],
      placements: [
        { slotId: "main", experienceId: "exp1", patternId: "hero-basic" },
        { slotId: "s1", experienceId: "exp2", patternId: "generic-card", },
        { slotId: "s2", experienceId: "exp3", patternId: "generic-card", },
      ],
    },
    experiences: [
      { 
        id: "exp1", 
        kind: "general", 
        title: "Alex Rivera", 
        summary: "Full-stack engineer specializing in scalable React architectures." // Added summary for HeroBasic
      },
      { 
        id: "exp2", 
        kind: "job", 
        title: "Senior Developer", 
        organization: "Tech Corp Inc." // Added organization for GenericCard
      },
       { 
        id: "exp3", 
        kind: "Project", 
        title: "AI SSAS BSBS", 
        organization: "Tech Corp Inc." // Added organization for GenericCard
      },
    ],
  },
};

export const PreviewPage = () => {

  const [params, setParams] = useSearchParams();

  const scenarioKey =
    params.get("scenario") && SCENARIOS[params.get("scenario")!]
      ? params.get("scenario")!
      : "Standard Profile";

  const data = useMemo(() => SCENARIOS[scenarioKey], [scenarioKey]);

  return (

      
        <div className="border border-dashed border-gray-400 p-2 min-h-[500px] bg-white shadow-lg text-black">
          <PortfolioRenderer data={data} />
        </div>
      

    
  );
};
