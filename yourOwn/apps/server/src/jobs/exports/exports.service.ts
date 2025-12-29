// src/modules/export/export.service.ts
import fs from "fs-extra";
import archiver from "archiver";
import path from "path";

export async function generatePortfolioData(sessionId: string) {
  // TODO: replace with DB queries:
  // - layout for sessionId
  // - experiences for sessionId
  // Must return shape: { layout, experiences }
  return {
    layout: { slots: [], placements: [] },
    experiences: [],
    meta: { sessionId },
  };
}

export async function insertPatterns(args: {
  workspaceDir: string;
  portfolioData: any;
}) {
  // TODO (recommended):
  // - get used patternIds from portfolioData.layout.placements
  // - copy required pattern components from packages/.. into workspace/src/patterns
  // - generate workspace/src/patterns-bridge.ts with PATTERN_REGISTRY
  return;
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
