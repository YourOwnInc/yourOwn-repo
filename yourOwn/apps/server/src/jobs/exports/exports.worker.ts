// src/modules/export/export.worker.ts
import path from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";
import { getExportJob, updateExportJob } from "./export.store";
// import { generatePortfolioData, insertPatterns, zipPortfolio } from "./exports.service";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const EXPORTS_DIR = path.resolve(process.cwd(), "tmp", "exports");
// prefer deterministic resolution with fallbacks and env override
const TEMPLATE_DIR = (() => {
  // allow override from env
  if (process.env.RENDERER_TEMPLATE_DIR) return path.resolve(process.env.RENDERER_TEMPLATE_DIR);

  // candidates to try (ordered)
  const candidates = [
    path.resolve(process.cwd(), "renderer"),                              // when server started from repo root
    path.resolve(process.cwd(), "..", "..", "renderer"),                  // if started from apps/server
    path.resolve(__dirname, "..", "..", "..", "renderer"),                // relative to this file (safe)
    path.resolve(__dirname, "..", "..", "..", "..", "renderer"),          // another possible layout
  ];

  for (const p of candidates) {
    if (fs.pathExistsSync(p)) return p;
  }

  // none found — throw clear error so you can fix path or set env var
  throw new Error(
    `Renderer template directory not found. Tried: ${candidates.join(", ")}. ` +
    `Set RENDERER_TEMPLATE_DIR env var to point to your renderer folder.`
  );
})();

export async function processExportJob(exportId: string) {
  const job = getExportJob(exportId);
  if (!job) return;

  const workspaceDir = path.resolve(process.cwd(), "tmp", "workspaces", exportId);

  try {
    updateExportJob(exportId, { status: "RUNNING", progress: 5 });

    await fs.ensureDir(EXPORTS_DIR);
    await fs.remove(workspaceDir);
    await fs.ensureDir(workspaceDir);

    // 1) Copy template (renderer Vite project) into workspace
    updateExportJob(exportId, { progress: 15 });
    await fs.copy(TEMPLATE_DIR, workspaceDir, {
      filter: (src) => {
        // keep exports clean
        if (src.includes("node_modules")) return false;
        if (src.includes("dist")) return false;
        if (src.includes(".env")) return false;
        return true;
      },
    });

    // 2) Generate portfolio.json
    updateExportJob(exportId, { progress: 35 });
    const data = await generatePortfolioData(job.sessionId);

    const dataPath = path.join(workspaceDir, "src", "data", "portfolio.json");
    await fs.ensureDir(path.dirname(dataPath));
    await fs.writeJson(dataPath, data, { spaces: 2 });

    // 3) Insert/copy patterns used
    updateExportJob(exportId, { progress: 55 });
    await insertPatterns({ workspaceDir, portfolioData: data });

    // 4) Zip workspace into final zip
    updateExportJob(exportId, { progress: 80 });
    const zipPath = path.join(EXPORTS_DIR, `${exportId}.zip`);
    await zipPortfolio({ workspaceDir, zipPath });

    updateExportJob(exportId, { status: "COMPLETED", progress: 100, zipPath });
  } catch (err: any) {
    updateExportJob(exportId, {
      status: "FAILED",
      progress: 100,
      error: err?.message ?? "Export failed",
    });
  } finally {
    // Cleanup workspace to keep disk clean
    await fs.remove(workspaceDir).catch(() => {});
  }
}
