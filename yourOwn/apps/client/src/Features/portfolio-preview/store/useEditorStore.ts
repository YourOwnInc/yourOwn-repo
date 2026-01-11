// import { create } from 'zustand';
// import { LayoutModel, ExperienceEntry, Placement, HydratedLayoutDTO } from '../types';

// interface EditorState {
//   layoutUuid: string | null;
//   layout: LayoutModel | null;
//   experiences: ExperienceEntry[];
//   isDirty: boolean; // Tracks if there are unsaved changes
  
//   // Actions
//   setEditorData: (data: HydratedLayoutDTO) => void;
//   upsertPlacement: (placement: Placement) => void;
//   clearDirty: () => void;
// }

// export const useEditorStore = create<EditorState>((set) => ({
//   layoutUuid: null,
//   layout: null,
//   experiences: [],
//   isDirty: false,

//   setEditorData: (data) => set({
//     layoutUuid: data.layout.id, // Store the UUID here for sync calls
//     layout: data.layout,
//     experiences: data.experienceLibrary,
//     isDirty: false
//   }),

//   upsertPlacement: (p) => set((state) => {
//     if (!state.layout) return state;
    
//     const otherPlacements = state.layout.placements.filter(x => x.slotId !== p.slotId);
//     return {
//       isDirty: true,
//       layout: {
//         ...state.layout,
//         placements: [...otherPlacements, p]
//       }
//     };
//   }),

//   clearDirty: () => set({ isDirty: false }),
// }));