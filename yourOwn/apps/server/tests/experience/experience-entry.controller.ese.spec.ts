import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import request from 'supertest';
import { startPostgres } from '../../src/tests/helpers/testcontainers';
import { initPrisma } from '../../src/tests/helpers/prisma';
import { PrismaClient } from '@prisma/client';

// Your app export should NOT start listening; just export the Express app
import  app  from '../../src/index'; // make sure app.ts exports `app`



let container: any;
let prisma: PrismaClient;

describe('Experiences API (E2E)', () => {
  beforeAll(async () => {
    const started = await startPostgres();
    container = started.container;
    prisma = await initPrisma(started.url);
  }, 120_000);

  afterAll(async () => {
    await prisma?.$disconnect();
    await container?.stop();
  }, 60_000);

  it('DELETE /experiences/:id → 204 when deleted', async () => {
    const session = await prisma.session.create({ data: {} });
    const exp = await prisma.experience.create({
      data: {
        title: 'To delete',
        start: new Date('2025-01-01T00:00:00.000Z'),
        kind: 'project',
        sessionId: session.id,
      }
    });

    // If ownerWhere reads from headers/ctx, set whatever header you use:
    const res = await request(app)
      .delete(`/experiences/${exp.id}`)
      .set('x-session-id', session.id);

    expect(res.status).toBe(204);
  });

  it('DELETE /experiences/:id → 404 when missing', async () => {
    const res = await request(app).delete(`/experiences/not-found-id`);
    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      error: { code: 'NOT_FOUND', message: 'Experience not found' }
    });
  });
});
