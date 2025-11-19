import { describe, it, expect, vi, beforeEach } from 'vitest';

// mock the repo layer (no DB)
vi.mock('../repositories/experience-entry.repo', () => ({
  updateExperienceOwned: vi.fn(async (_id, _owner, patch) => ({ id: 'exp1', ...patch })),
  deleteExperienceOwned: vi.fn(async () => true),
}));

import * as repo from '../../src/repositories/experience-entry.repo';
import * as svc from '../../src/services/experience-entry.service';

describe('experience-entry.service (unit)', () => {
  beforeEach(() => vi.clearAllMocks());

  const patch = {
    title: 'New',
    start: new Date('2025-01-01T00:00:00.000Z'),
    end: null,
    kind: 'project',
  };

  it('updateExperienceOwned ok with sessionId only', async () => {
    const res = await svc.updateExperienceOwned('exp1', { userId: null, sessionId: 's1' }, patch);
    expect(res).toMatchObject({ id: 'exp1', title: 'New' });
    expect((repo as any).updateExperienceOwned).toHaveBeenCalledWith('exp1', { userId: null, sessionId: 's1' }, patch);
  });

  it('updateExperienceOwned throws if owner invalid', async () => {
    await expect(svc.updateExperienceOwned('exp1', { userId: null, sessionId: null }, patch))
      .rejects.toThrow(/Exactly one of userId or sessionId/);
  });

  it('deleteExperienceOwned ok', async () => {
    const ok = await svc.deleteExperienceOwned('exp1', { sessionId: 's1' });
    expect(ok).toBe(true);
  });
});
