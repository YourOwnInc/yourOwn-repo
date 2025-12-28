import { useCallback, useEffect, useState } from 'react';
import { listExperiences } from '../services/experienceService';
import { PortfolioEntry, ExperienceEntry } from '../types';
import { useUser } from '../contexts/UserContext';
import { ExperienceDTO } from '../domain/types';

function mapExperienceToPortfolio(e: ExperienceDTO, idx: number): PortfolioEntry {
  return {
    id: e.id ?? `exp-${idx}-${Date.now()}`,
    title: (e as any).title ?? (e as any).name ?? 'Untitled',
    summary: (e as any).summary ?? (e as any).description ?? '',
    type: (e as any).type,
    start: (e as any).start,
    end: (e as any).end,
    images: (e as any).images ?? [],
    position: (e as any).position ?? { x: (idx % 4) + 1, y: Math.floor(idx / 4) + 1 },
    size: (e as any).size,
  };
}

export function useExperiences() {
  const { sessionId } = useUser();
 
  const [experiences, setExperiences] = useState<PortfolioEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const load = useCallback(async () => {
    if (!sessionId) {
      setExperiences([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const exps: ExperienceDTO[] = await listExperiences(sessionId);
      const mapped = exps.map(mapExperienceToPortfolio);
      setExperiences(mapped);
    } catch (err: any) {
      setError(err);
      setExperiences([]);
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    void load();
  }, [load]);

  return { experiences, loading, error, reload: load, sessionId };
}