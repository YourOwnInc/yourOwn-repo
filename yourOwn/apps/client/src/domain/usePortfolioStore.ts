import { useCallback, useEffect, useMemo, useState } from "react";
import { assignItem, getLayout } from "../Features/portfolio-preview/services/layoutService";
import { createExperience, deleteExperience, listExperiences, updateExperience,  } from "../services/experienceService";
import type { ExperienceDTO, SessionId, LayoutModel, Placement, PortfolioModel } from "./types";
import { useUser} from "../contexts/UserContext";
import { PortfolioEntry, ExperienceEntry } from '../types';

export function usePortfolioStore() {
  const [layout, setLayout] = useState<LayoutModel | null>(null);
  const [experiences, setExperiences] = useState<PortfolioEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError ] = useState<string | null>(null);
  const { user, sessionId, authToken } = useUser(); //adds authtoken in context if needed.
  //Make the context handle session Switches? IE updating sessionId when user wants to look at other sessions they have?

  useEffect(() => {

    let cancelled = false;
    (async () => {
      // Guard: do nothing until a session exists
      if (!sessionId) {
        setLayout(null);
        setExperiences([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      console.log("SessionId given to get exp", sessionId );
      try {
        const [l, exps] = await Promise.all([getLayout(sessionId), listExperiences(sessionId)]);
        if (!cancelled) {
          setLayout(l);
          setExperiences(exps);
          setError(null);
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err?.message ?? String(err));
          setLayout(null);
          setExperiences([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [sessionId]);

  const addExperience = useCallback(async (payload: Omit<ExperienceDTO, "id" | "sessionId">) => {
    if (!sessionId) throw new Error("Cannot create experience: sessionId is required");
    const created = await createExperience(sessionId, payload);
    setExperiences((prev) => [created, ...prev]);
    return created;
  }, [sessionId]);

  const editExperience = useCallback(async (id: string , payload:  Partial<ExperienceDTO>)=> {
     if (!sessionId) throw new Error("Cannot update experience: sessionId is required");
     const edited = await updateExperience(sessionId,id,payload)
     setExperiences((prev) => prev.map(e => e.id === id ? { ...e, ...edited } : e))
    return edited;
  }, [sessionId])

  const removeExperience=  useCallback(async (id: string) => {

  }, [])

  const upsertPlacement = useCallback(async (p: Placement) => {
    if (!sessionId) throw new Error("Cannot upsert placement: sessionId is required");
    await assignItem(sessionId, p);
    setLayout((prev) => {
      if (!prev) return prev;
      const others = prev.placements.filter(x => x.slotId !== p.slotId);
      return { ...prev, placements: [...others, p] };
    });
  }, [sessionId]);

  const model: PortfolioModel | null  = useMemo(() => {
    if (!layout) return null;
    return { layout, experiences };
  }, [layout, experiences]);

  return { loading, layout, experiences, model, error, addExperience, upsertPlacement, editExperience, removeExperience };
}
