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
    const htmlString= req.body.html;
    if (!htmlString) {
        return res.status(400).send("Missing html in request");
    }
    const templateDir = path.join(__dirname, "..", "sample");
    const tempDir = path.join(__dirname, "..", "portfolio");

    await fs.copy(templateDir, tempDir);

    const htmlPath = path.join(tempDir, "index.html");
    await fs.writeFile(htmlPath, htmlString, "utf-8");

    res.setHeader(
        "Content-Disposition", 
        "attachment; filename=portfolio.zip"
    );
    res.setHeader("Content-Type", "application/zip");

    const archive = archiver("zip", { 
        zlib: { 
            level: 9 
        } 
    });
    archive.pipe(res);
    archive.directory(tempDir, false);
    await archive.finalize();

    await fs.remove(tempDir);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to generate zip");
  }
};