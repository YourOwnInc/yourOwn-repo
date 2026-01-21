import { useCallback, useEffect, useMemo, useState } from "react";
import { createExperience, deleteExperience, listExperiences, updateExperience,  } from "../Features/experiences/services/experienceService";
import type { ExperienceDTO, SessionId, LayoutModel, Placement, PortfolioModel } from "../lib/types";
import { useUser} from "../core/auth/UserContext";
import { PortfolioEntry, ExperienceEntry } from '../types';

export function usePortfolioStore() {
  const [layout, setLayout] = useState<LayoutModel | null>(null);
  const [experiences, setExperiences] = useState<PortfolioEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError ] = useState<string | null>(null);
  const { user, sessionId, authToken } = useUser(); //adds authtoken in context if needed.
  //Make the context handle session Switches? IE updating sessionId when user wants to look at other sessions they have?

  useEffect(() => {

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


  return { loading, layout, experiences, error,  editExperience, removeExperience };
}