import { create } from 'zustand';
import { HydratedLayoutDTO, Placement, ExperienceDTO } from '../../../domain/types';

interface EditorState {
  // Core state
  layoutUuid: string | null;
  layoutName: string;
  placements: Placement[];
  experienceLibrary: ExperienceDTO[];
  
  // UI State
  isDirty: boolean;

  // Actions
  setEditorData: (data: HydratedLayoutDTO) => void;
  updatePlacement: (p: Placement) => void;
  saveChanges: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  layoutUuid: null,
  layoutName: 'home',
  placements: [],
  experienceLibrary: [],
  isDirty: false,

  // Initialize the store with the flat DTO from the server
  setEditorData: (data) => set({
    layoutUuid: data.id,
    layoutName: data.layoutName,
    placements: data.placements,
    experienceLibrary: data.experienceLibrary,
    isDirty: false
  }),

  // Upsert logic for editing a specific slot
  updatePlacement: (newPlacement) => set((state) => {
    const filtered = state.placements.filter(p => p.slotId !== newPlacement.slotId);
    return {
      placements: [...filtered, newPlacement],
      isDirty: true
    };
  }),

  saveChanges: () => set({ isDirty: false }),
}));