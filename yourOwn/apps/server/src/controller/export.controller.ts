// src/modules/export/export.controller.ts
import { Request, Response } from "express";
import crypto from "crypto";
import fs from "fs-extra";
import path from "path";
import { createExportJob, getExportJob } from "../jobs/exports/export.store";
import { enqueueExport } from "../jobs/exports/exports.queue";

// POST /api/exports
export async function startExportJob(req: Request, res: Response) {
  // You decide where sessionId comes from (body, auth, route param)
  const sessionId = req.body?.sessionId;
  if (!sessionId) return res.status(400).json({ error: "Missing sessionId" });

  const exportId = crypto.randomUUID();
  createExportJob({ id: exportId, sessionId });

  // enqueue background processing
  enqueueExport(exportId);

  return res.status(202).json({
    exportId,
    statusUrl: `/api/exports/${exportId}`,
    downloadUrl: `/api/exports/${exportId}/download`,
  });
}

// GET /api/exports/:exportId
export async function getExportStatus(req: Request, res: Response) {
  const { exportId } = req.params;
  const job = getExportJob(exportId);

  if (!job) return res.status(404).json({ error: "Export not found" });

  return res.json({
    exportId: job.id,
    sessionId: job.sessionId,
    status: job.status,
    progress: job.progress,
    error: job.error ?? null,
    // only provide downloadUrl when completed
    downloadUrl: job.status === "COMPLETED" ? `/api/exports/${job.id}/download` : null,
  });
}

// GET /api/exports/:exportId/download
export async function downloadExport(req: Request, res: Response) {
  const { exportId } = req.params;
  const job = getExportJob(exportId);

  if (!job) return res.status(404).json({ error: "Export not found" });

  if (job.status !== "COMPLETED" || !job.zipPath) {
    return res.status(409).json({ error: "Export not ready", status: job.status });
  }

  const zipPath = job.zipPath;
  const exists = await fs.pathExists(zipPath);
  if (!exists) return res.status(410).json({ error: "Export file missing" });

  // Stream download
  res.setHeader("Content-Type", "application/zip");
  res.setHeader("Content-Disposition", `attachment; filename="yourown-export-${exportId}.zip"`);

  return res.sendFile(path.resolve(zipPath));
}


