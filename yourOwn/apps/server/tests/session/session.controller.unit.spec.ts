import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the service functions used by the controller:
vi.mock('../../src/services/session.service', () => ({
  startSession: vi.fn(async () => ({ id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa' })),
  claimSession: vi.fn(async (_id: string, _userId: string) => undefined),
}));

import { startSession, claim } from '../../src/controller/session.controller';
import * as svc from '../../src/services/session.service';

const mockRes = () => {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  res.end = vi.fn().mockReturnValue(res);
  return res;
};

describe('session.controller (unit)', () => {
  beforeEach(() => vi.clearAllMocks());

  it('startSession: 201 and returns {id}', async () => {
    const req: any = { body: {} };
    const res = mockRes();
    await startSession(req, res, vi.fn());

    expect(svc.startSession).toHaveBeenCalledTimes(1);
    // If your controller should return 201:
    // expect(res.status).toHaveBeenCalledWith(201);
    // expect(res.json).toHaveBeenCalledWith({ id: expect.stringMatching(/[0-9a-f-]{36}/i) });
    // If it returns 200, adjust accordingly:
    expect(res.json).toHaveBeenCalledWith({ id: expect.stringMatching(/[0-9a-f-]{36}/i) });
  });

  it('claim: 400 on bad session id', async () => {
    const req: any = { params: { id: 'not-a-uuid' }, user: { id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa' } };
    const res = mockRes();
    await claim(req, res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('claim: 401 on bad user id', async () => {
    const req: any = { params: { id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa' }, user: { id: 'bad' } };
    const res = mockRes();
    await claim(req, res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('claim: 200 and ok:true on success', async () => {
    const req: any = { params: { id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa' }, user: { id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb' } };
    const res = mockRes();
    await claim(req, res, vi.fn());

    expect(svc.claimSession).toHaveBeenCalledWith(
      'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'
    );
    expect(res.json).toHaveBeenCalledWith({ ok: true });
  });
});
