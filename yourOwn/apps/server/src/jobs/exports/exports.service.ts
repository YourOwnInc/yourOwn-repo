// src/modules/export/export.service.ts
import fs from "fs-extra";
import archiver from "archiver";
import path from "path";
import * as experienceService from "../../services/experience-entry.service";
import { PATTERN_REGISTRY } from "../../../../../packages/ui-patterns/src/registry";
import { prisma } from "../../lib/prisma";

export async function generatePortfolioData(sessionId: string) {
  console.log("🔍 [generatePortfolioData] Starting with sessionId:", sessionId);

  const experiences = await experienceService.listExperiences({ sessionId })
  console.log("✅ [generatePortfolioData] Experiences fetched:", experiences.length, "items");

  const filtered = experiences.map(exp => ({
    id: exp.id,
    title: exp.title,
    description: exp.summary,
    kind: exp.kind,
  }))
  console.log("✅ [generatePortfolioData] Experiences filtered:", filtered.length, "items");

  const layouts = await prisma.layout.findMany({
    where: { sessionId, label: "page" },
    include: { slots: true, placements: true }
  });

  // For the MVP export, we'll just take the first layout or Home
  const activeLayout = layouts.find(l => l.LayoutId === "home") || layouts[0] || { id: "default", LayoutId: "home", slots: [], placements: [] };

  const body = {
    layout: activeLayout,
    experiences: filtered,
    meta: { sessionId },
  }
  console.log("✅ [generatePortfolioData] Portfolio data generated:", body.experiences.length, "experiences");
  return body;
}

export async function insertPatterns(args: {
  workspaceDir: string;
  portfolioData: any;
}) {
  console.log("🔍 [insertPatterns] Starting with workspaceDir:", args.workspaceDir);

  const { workspaceDir, portfolioData } = args;

  const usedPatternIds = Array.from(new Set(
    portfolioData.layout.placements.map((p: any) => p.patternId)
  )) as string[];
  console.log("✅ [insertPatterns] Used pattern IDs:", usedPatternIds);

  const layoutId = portfolioData.layout.id || "bento-v1";
  console.log("✅ [insertPatterns] Layout ID:", layoutId);

  const patternsDir = path.join(workspaceDir, "src", "patterns");
  const layoutsDir = path.join(workspaceDir, "src", "layouts");
  console.log("📁 [insertPatterns] Directories - patterns:", patternsDir, "layouts:", layoutsDir);

  await fs.ensureDir(patternsDir);
  await fs.ensureDir(layoutsDir);
  console.log("✅ [insertPatterns] Directories created");

  for (const id of usedPatternIds) {
    const src = path.resolve(process.cwd(), "packages/ui-patterns/src/patterns", id);
    console.log(`🔍 [insertPatterns] Checking pattern '${id}' at:`, src);

    if (await fs.pathExists(src)) {
      console.log(`✅ [insertPatterns] Pattern '${id}' found, copying...`);
      await fs.copy(src, path.join(patternsDir, id));
      console.log(`✅ [insertPatterns] Pattern '${id}' copied successfully`);
    } else {
      console.warn(`⚠️ [insertPatterns] Pattern '${id}' NOT FOUND at:`, src);
    }
  }

  const layoutSrc = path.resolve(process.cwd(), "packages/layouts", layoutId + ".tsx");
  console.log("🔍 [insertPatterns] Checking layout at:", layoutSrc);

  if (await fs.pathExists(layoutSrc)) {
    console.log("✅ [insertPatterns] Layout found, copying...");
    await fs.copy(layoutSrc, path.join(layoutsDir, layoutId + ".tsx"));
    console.log("✅ [insertPatterns] Layout copied successfully");
  } else {
    console.warn("⚠️ [insertPatterns] Layout NOT FOUND at:", layoutSrc);
  }

  const bridgePath = path.join(workspaceDir, "src", "patterns-bridge.ts");
  console.log("🔍 [insertPatterns] Writing bridge file to:", bridgePath);

  const toPascalCase = (str: string) =>
    str.replace(/(^\w|-\w)/g, (m) => m.replace(/-/, "").toUpperCase());

  const imports = usedPatternIds
    .map(id => `import { ${toPascalCase(id)} } from './patterns/${id}';`)
    .join("\n");

  const layoutImport = `import { ${toPascalCase(layoutId)} } from './layouts/${layoutId}';`;

  const fileContent = `
  ${imports}
  ${layoutImport}

  export const PATTERN_REGISTRY: Record<string, any> = {
    ${usedPatternIds.map(id => `"${id}": ${toPascalCase(id)}`).join(",\n  ")}
  };

  export const LAYOUT_REGISTRY: Record<string, any> = {
    "${layoutId}": ${toPascalCase(layoutId)},
    "bento-v1": ${toPascalCase(layoutId)} // Fallback for the renderer
  };
  `;

  await fs.writeFile(bridgePath, fileContent);
  console.log("✅ [insertPatterns] Bridge file written successfully");
}


export async function zipPortfolio(args: { workspaceDir: string; zipPath: string }) {
  console.log("🔍 [zipPortfolio] Starting with workspaceDir:", args.workspaceDir, "zipPath:", args.zipPath);

  const { workspaceDir, zipPath } = args;

  await fs.ensureDir(path.dirname(zipPath));
  console.log("✅ [zipPortfolio] Zip directory ensured");

  await fs.remove(zipPath);
  console.log("✅ [zipPortfolio] Existing zip removed");

  await new Promise<void>((resolve, reject) => {
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => {
      console.log("✅ [zipPortfolio] Zip completed, file size:", fs.statSync(zipPath).size, "bytes");
      resolve();
    });

    output.on("error", (err) => {
      console.error("❌ [zipPortfolio] Output error:", err);
      reject(err);
    });

    archive.on("error", (err) => {
      console.error("❌ [zipPortfolio] Archive error:", err);
      reject(err);
    });

    archive.pipe(output);
    archive.directory(workspaceDir, false);
    console.log("✅ [zipPortfolio] Archive directory added, finalizing...");
    archive.finalize();
  });
}
