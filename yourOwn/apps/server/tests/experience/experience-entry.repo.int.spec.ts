import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import { startPostgres } from '../../src/tests/helpers/testcontainers';
import { initPrisma } from '../../src/tests/helpers/prisma';
import { faker } from '@faker-js/faker';

// Import your real repo (no mocks)
import * as repo from '../../src/repositories/experience-entry.repo';

let container: any;
let prisma: any;

describe('experience-entry.repo (integration)', () => {
  beforeAll(async () => {
    const started = await startPostgres();
    container = started.container;
    prisma = await initPrisma(started.url);
  }, 120_000);

  afterAll(async () => {
    await prisma?.$disconnect();
    await container?.stop();
  }, 60_000);

  it('creates and fetches an experience by session owner', async () => {
    // arrange: create a session and an experience row (depending on your schema)
    const session = await prisma.session.create({ data: {} });
    const created = await prisma.experience.create({
      data: {
        title: faker.person.jobTitle(),
        summary: 'testing',
        start: new Date('2025-01-01T00:00:00.000Z'),
        kind: 'project',
        sessionId: session.id,
      }
    });

    // act: call your repository read/find/update
    const updated = await repo.updateExperienceOwned(
      created.id,
      { sessionId: session.id, userId: null },
      { title: 'Updated Title' }
    );

    // assert
    expect(updated?.title).toBe('Updated Title');
  });
});
