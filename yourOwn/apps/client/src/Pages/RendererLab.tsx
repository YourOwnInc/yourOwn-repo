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
  "Broken Pattern ID": {
    
    layout: {
      id: "bento-v1",
      slots: [{ id: "s1", area: "header" }],
      placements: [{ slotId: "s1", experienceId: "exp1", patternId: "hero-missing" }],
    },
    experiences: [{ id: "exp1", kind: "general", title: "Test Title", summary: "Test Summary" }],
  },

  "Missing Data": {
    layout: {
      id: "bento-v1",
      slots: [{ id: "s1", area: "header" }],
      // This tests what happens when a placement points to an ID that doesn't exist in the experiences array
      placements: [{ slotId: "s1", experienceId: "exp-ghost", patternId: "hero-basic" }],
    },
    experiences: [],
  },
};

export const RendererLab = () => {

  const [params, setParams] = useSearchParams();

  const scenarioKey =
    params.get("scenario") && SCENARIOS[params.get("scenario")!]
      ? params.get("scenario")!
      : "Standard Profile";

  const data = useMemo(() => SCENARIOS[scenarioKey], [scenarioKey]);

  return (
    <div className="flex h-screen">
      <div className="w-72 bg-gray-100 p-4 border-r">
        <h2 className="font-bold mb-4">🧪 Renderer Lab</h2>

        <div className="flex flex-col gap-2">
          {Object.keys(SCENARIOS).map((key) => (
            <button
              key={key}
              onClick={() => setParams({ scenario: key })}
              className={`p-2 text-left rounded ${
                scenarioKey === key ? "bg-blue-500 text-black" : "bg-gray-200 text-gray-700"
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        <div className="mt-8 text-xs text-gray-500 space-y-1">
          <p>Active Layout: {data.layout.slots.length} slots</p>
          <p>Active Exps: {data.experiences.length} items</p>
          <p className="break-all">Share: ?scenario={encodeURIComponent(scenarioKey)}</p>
        </div>
      </div>

      <div className="flex-1 p-8 bg-gray-50 overflow-auto">
        <div className="border border-dashed border-gray-400 p-2 min-h-[500px] bg-white shadow-lg text-black">
          <PortfolioRenderer data={data} />
        </div>
      </div>

    </div>
  );
};
