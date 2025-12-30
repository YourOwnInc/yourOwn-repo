// src/modules/export/export.service.ts
import fs from "fs-extra";
import archiver from "archiver";
import path from "path";
import * as experienceService from "../../services/experience-entry.service";
import { PATTERN_REGISTRY } from "../../../../../packages/ui-patterns/src/registry";
 
export async function generatePortfolioData(sessionId: string) {
  // TODO: replace with DB queries:
  const experiences = await experienceService.listExperiences({sessionId})
  // filter to only include relevant fields
  const  filtered = experiences.map(exp => ({
    id: exp.id,
    title: exp.title,
    description: exp.summary,
    kind: exp.kind,
    // add other fields as needed
  }))
  const layout = {
    slots: [
        { id: "s1", area: "header" },
        { id: "s2", area: "main" },
        { id: "s3", area: "main" },
      ],
      placements: [
        { slotId: "s1", experienceId: "exp1", patternId: "hero-basic" },
        { slotId: "s2", experienceId: "exp2", patternId: "generic-card", },
        { slotId: "s3", experienceId: "exp3", patternId: "generic-card", },
      ],
  }
  const body = {
    layout, 
    experiences: filtered,
    meta: { sessionId },
  }
  console.log("Generated portfolio data:", body);

  // Must return shape: { layout, experiences }
  return body;
}

// Figure out how to insert Patterns from /packages into the portfolio workspace

export async function insertPatterns(args: {
  workspaceDir: string;
  portfolioData: any;
}) {
  // TODO (recommended):
  // - get used patternIds from portfolioData.layout.placements
    const { workspaceDir, portfolioData } = args;
    const usedPatternIds = Array.from(new Set(
      portfolioData.layout.placements.map((p: any) => p.patternId)
    ));
    console.log("Used pattern IDs:", usedPatternIds);   

  // - copy required pattern components from packages/.. into workspace/src/patterns
    const patternsDir = path.join(workspaceDir, "src", "patterns");

    await fs.ensureDir(patternsDir);
    for (const patternId of usedPatternIds) {
        const pattern = PATTERN_REGISTRY[patternId];
        if (!pattern) {
            console.warn(`Pattern ID "${patternId}" not found in registry.`);
            continue;
        }
        const patternSrcPath = path.resolve(__dirname, `../../../../../packages/ui-patterns/src/patterns/${patternId}`);
        await fs.copy(patternSrcPath, path.join(patternsDir, patternId));
    }

  // - generate workspace/src/patterns-bridge.ts with PATTERN_REGISTRY
  return ;
}

export async function zipPortfolio(args: { workspaceDir: string; zipPath: string }) {
  const { workspaceDir, zipPath } = args;

  await fs.ensureDir(path.dirname(zipPath));
  await fs.remove(zipPath);

  await new Promise<void>((resolve, reject) => {
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => resolve());
    archive.on("error", (err) => reject(err));

    archive.pipe(output);
    archive.directory(workspaceDir, false);
    archive.finalize();
  });
}
