import { Request, Response } from "express";
import path from "path";
import fs from "fs-extra";
import archiver from "archiver";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function zipTemplate(req: Request, res: Response) {
  try {
    // the client sends { html: { ...data... } }
    const exportData = req.body.html;
    if (!exportData) {
      return res.status(400).json({ error: "Missing html data in body" });
    }

    // 1. Make a temporary directory for this export
    const tempDir = path.join(__dirname, "..", "..", "tmp", `export-${Date.now()}`);
    await fs.ensureDir(tempDir);

    // 2. Make a simple HTML file from the JSON
    const userName = exportData.userName || "portfolio";
    const entries = exportData.entries || [];

    const html = `
<!DOCTYPE html>
<html>
  <head><title>${userName}'s Export</title></head>
  <body>
    <h1>${userName}'s Portfolio</h1>
    <pre>${JSON.stringify(entries, null, 2)}</pre>
  </body>
</html>
`;

    await fs.writeFile(path.join(tempDir, "index.html"), html, "utf8");
    await fs.writeFile(
      path.join(tempDir, "raw.json"),
      JSON.stringify(exportData, null, 2),
      "utf8"
    );

    // 3. Prepare the response for ZIP download
    res.setHeader("Content-Type", "application/zip");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${userName.toLowerCase()}-export.zip"`
    );

    // 4. Compress the temp folder
    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.pipe(res);
    archive.directory(tempDir, false);
    await archive.finalize();

    // 5. Clean temp dir after streaming
    archive.on("end", async () => {
      await fs.remove(tempDir);
    });
  } catch (err) {
    console.error("EXPORT ERROR:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to export ZIP" });
    }
  }
}

