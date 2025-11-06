import { useCallback, useEffect, useMemo, useState } from "react";
import { assignSlot, getLayout } from "../services/layoutService";
import { createExperience, deleteExperience, listExperiences, updateExperience,  } from "../services/experienceService";
import type { ExperienceDTO, SessionId, LayoutModel, Placement, PortfolioModel } from "./types";

export function usePortfolioStore(sessionId: SessionId) {
  const [layout, setLayout] = useState<LayoutModel | null>(null);
  const [experiences, setExperiences] = useState<ExperienceDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError ] = useState<string | null>(null);

  useEffect(() => {

    let cancelled = false;
    (async () => {
      setLoading(true);
      const [l, exps] = await Promise.all([getLayout(sessionId), listExperiences(sessionId)]);
      if (!cancelled) {
        setLayout(l);
        setExperiences(exps);
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [sessionId]);

  const addExperience = useCallback(async (payload: Omit<ExperienceDTO, "id" | "sessionId">) => {
    const created = await createExperience(sessionId, payload);
    setExperiences((prev) => [created, ...prev]);
    return created;
  }, [sessionId]);

  const editExperience = useCallback(async (id: string , payload:  Partial<ExperienceDTO>)=> {
     const edited = await updateExperience(id,payload)
     setExperiences((prev) => [edited, ...prev])
    return edited;
  }, [] )

  const removeExperience=  useCallback(async (id: string) => {
    await deleteExperience(id)
    setExperiences((prev) => prev.filter(e => e.id !== id));

  }, [])

  const upsertPlacement = useCallback(async (p: Placement) => {
    await assignSlot(sessionId, p);
    setLayout((prev) => {
      if (!prev) return prev;
      const others = prev.placements.filter(x => x.slotId !== p.slotId);
      return { ...prev, placements: [...others, p] };
    });
  }, [sessionId]);

  const model: PortfolioModel | null = useMemo(() => {
    if (!layout) return null;
    return { layout, experiences };
  }, [layout, experiences]);

  return { loading, layout, experiences, model, error, addExperience, upsertPlacement, editExperience, removeExperience };
}
