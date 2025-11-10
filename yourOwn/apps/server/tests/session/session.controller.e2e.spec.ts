import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { startPostgres } from '../../src/tests/helpers/testcontainers';
import { initPrisma } from '../../src/tests/helpers/prisma';
import { PrismaClient } from '@prisma/client';

// Make sure app.ts exports the Express app without starting the listener
import app  from '../../src/index';

let container: any;
let prisma: PrismaClient;

function uuid() {
  return 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'; // stable for test
}

describe('Session API (E2E)', () => {
  beforeAll(async () => {
    const { container: c, url } = await startPostgres();
    container = c;
    prisma = await initPrisma(url);
  }, 120_000);

  afterAll(async () => {
    await prisma?.$disconnect();
    await container?.stop();
  }, 60_000);

  it('POST /sessions → starts a session and returns {id}', async () => {
    const res = await request(app).post('/sessions').send({ metadata: { hello: 'world' } });
    expect(res.status).toBeLessThan(300);           // 200 or 201 depending on your controller
    expect(res.body).toHaveProperty('id');
    expect(res.body.id).toMatch(/[0-9a-f-]{36}/i);
  });

  it('POST /sessions/:id/claim → 200 with ok:true when valid', async () => {
    // Create a session first
    const start = await request(app).post('/sessions').send({});
    const id = start.body.id;

    const res = await request(app)
      .post(`/sessions/${id}/claim`)
      // However you convey the authenticated user; your controller looks at req.user.id:
      // If you populate req.user via middleware from a header, emulate it here.
      .set('x-user-id', uuid())    // <- implement your middleware to set req.user from this
      .send();

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });

  it('POST /sessions/:id/claim → 400 for bad session id', async () => {
    const res = await request(app).post('/sessions/not-a-uuid/claim').set('x-user-id', uuid());
    expect(res.status).toBe(400);
  });

  it('POST /sessions/:id/claim → 401 for bad user id', async () => {
    const start = await request(app).post('/sessions').send({});
    const id = start.body.id;

    const res = await request(app).post(`/sessions/${id}/claim`).set('x-user-id', 'bad').send();
    expect(res.status).toBe(401);
  });
});
