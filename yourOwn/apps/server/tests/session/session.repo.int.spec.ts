import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { startPostgres } from '../../src/tests/helpers/testcontainers';
import { initPrisma } from '../../src/tests/helpers/prisma';

import * as repo from '../../src/repositories/session.repo';
import { PrismaClient } from '@prisma/client';

let container: any;
let prisma: PrismaClient;

describe('session.repo (integration)', () => {
  beforeAll(async () => {
    const { container: c, url } = await startPostgres();
    container = c;
    prisma = await initPrisma(url);
  }, 120_000);

  afterAll(async () => {
    await prisma?.$disconnect();
    await container?.stop();
  }, 60_000);

  it('createSession → creates an empty row and returns UUID', async () => {
    const s = await repo.createSession();
    expect(s.id).toMatch(/[0-9a-f-]{36}/i);

    const fetched = await repo.getSession(s.id);
    expect(fetched?.id).toBe(s.id);
    expect(fetched?.claimedByUserId ?? null).toBeNull();
  });

  it('claimSession → sets claimedByUserId', async () => {
    const s = await repo.createSession();
    const userId = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

    await repo.claimSession({ sessionId: s.id, userId });

    const after = await repo.getSession(s.id);
    expect(after?.claimedByUserId).toBe(userId);
  });
});
