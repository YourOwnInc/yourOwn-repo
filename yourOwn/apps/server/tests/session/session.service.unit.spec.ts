import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the repo (no DB)
vi.mock('../../src/repositories/session.repo', () => ({
  createSession: vi.fn(async () => ({ id: 'f1a2b3c4-d5e6-4711-9abc-0123456789ab', createdAt: new Date() })),
  getSession: vi.fn(async (id: string) => ({ id, createdAt: new Date(), claimedByUserId: null, metadata: null })),
  claimSession: vi.fn(async () => undefined),
}));

import * as repo from '../../src/repositories/session.repo';
// If your service lives elsewhere, update this import:
import * as svc from '../../src/services/session.service';

describe('session.service (unit)', () => {
  beforeEach(() => vi.clearAllMocks());

  it('startSession returns created row from repo', async () => {
    const s = await svc.startSession();
    expect(s.id).toMatch(/[0-9a-f-]{36}/i);
    expect((repo as any).createSession).toHaveBeenCalledTimes(1);
  });

  it('claimSession calls repo with sessionId and userId', async () => {
    await svc.claimSession('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222');
    expect((repo as any).claimSession).toHaveBeenCalledWith({
      sessionId: '11111111-1111-1111-1111-111111111111',
      userId: '22222222-2222-2222-2222-222222222222',
    });
  });
});
