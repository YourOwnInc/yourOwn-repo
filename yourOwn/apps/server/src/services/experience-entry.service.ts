import { 
  AddExperienceEntryBody, 
  ExperienceEntryRepo, 
  SaveExperienceEntryBody 
} from "../repositories/experience-entry.repo";

export function makeExperienceEntryService(
  entries: ExperienceEntryRepo
) {
  return {
    // Create the new experience entry
    startExperienceEntry: async(input: AddExperienceEntryBody) => {
      return entries.create(input);
    },

    // Get the experience entry by id
    getExperienceEntry: async (id: string) => entries.findById(id),

    // Update the experience entry
    saveExperienceEntry: async(id: string, patch: SaveExperienceEntryBody) => {
      return entries.update(id, patch);
    },

    // Get the experience entry by id 
    getEntriesBySession: (sessionId: string) => {
      return entries.findBySession(sessionId)
    },

    // Delete the experience entry by id
    delete: async (id: string) => entries.delete(id)
  };
}