// src/modules/export/export.store.ts
export type ExportStatus = "QUEUED" | "RUNNING" | "COMPLETED" | "FAILED";

export type ExportJob = {
  id: string;
  sessionId: string;
  status: ExportStatus;
  createdAt: string;
  updatedAt: string;
  progress: number; // 0..100
  zipPath?: string; // local file path (dev)
  error?: string;
};

const jobs = new Map<string, ExportJob>();

function nowISO() {
  return new Date().toISOString();
}

export function createExportJob(input: { id: string; sessionId: string }): ExportJob {
  const job: ExportJob = {
    id: input.id,
    sessionId: input.sessionId,
    status: "QUEUED",
    createdAt: nowISO(),
    updatedAt: nowISO(),
    progress: 0,
  };
  jobs.set(job.id, job);
  return job;
}

export function getExportJob(id: string): ExportJob | undefined {
  return jobs.get(id);
}

export function updateExportJob(id: string, patch: Partial<ExportJob>): ExportJob {
  const job = jobs.get(id);
  if (!job) throw new Error(`ExportJob not found: ${id}`);

  const updated: ExportJob = {
    ...job,
    ...patch,
    updatedAt: nowISO(),
  };
  jobs.set(id, updated);
  return updated;
}
