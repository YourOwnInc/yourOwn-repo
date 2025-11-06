import { makeInMemoryExperienceEntryRepo } from "../repositories/memory/experience-entry.repo.memo";
import { makeExperienceEntryService } from "../services/experience-entry.service";
import { ah } from "./session.controller";
import { 
  AddExperienceEntryBody, 
  SaveExperienceEntryBody 
} from "../repositories/experience-entry.repo";

const entryService = makeExperienceEntryService(
  makeInMemoryExperienceEntryRepo()
);

/**
 * ```POST /sessions/:id/entries```
 * 
 * Add a new ExperienceEntry to the session
 */
export const addExperienceEntry = ah(async (req, res) => {
  const sessionId = req.params.id;
  // Body of request from title -> tags
  // Coalese the id references to null, not necessary for entry
  const parsed = AddExperienceEntryBody.safeParse({
    sessionId: sessionId,
    userId: req.body.userId ?? null, 
    templateVariantId: req.body.templateVariantId ?? null,
    ...req.body,
  });
  if (!parsed.success) {
    res.status(400).json(parsed.error)
  }
  const newEntry = await entryService.startExperienceEntry(parsed.data!);
  res.status(201).json(newEntry);
});

/**
 * ```GET /sessions/:id/entries```
 * 
 * Get the list of experience entries of the session
 */
export const getExperienceEntries = ah(async (req, res) => {
  const sessionId = req.params.id; 
  const entries = await entryService.getEntriesBySession(sessionId);
  res.json(entries);
});

/**
 * ```GET /entries/:id```
 */
export const getExperienceEntry = ah(async (req, res) => {
  const id = req.params.id;
  const entry = await entryService.getExperienceEntry(id);
  if (!entry) {
    return res.status(404).json({
      error: "Experience entry not found"
    });
  }
  res.json(entry);
});

/**
 * ```PUT /entries/:id```
 */
export const saveExperienceEntry = ah(async (req, res) => {
  const id = req.params.id;
  const parsed = SaveExperienceEntryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json(parsed.error)
  }
  const updated = await entryService.saveExperienceEntry(
    id, parsed.data!
  );
  res.json(updated);
});

/**
 * ```DELETE /entries/:id```
 */
export const deleteExperienceEntry = ah(async (req, res) => {
  const id = req.params.id;
  await entryService.delete(id);
  res.json({
    message: "Experience entry deleted successfully"
  });
});