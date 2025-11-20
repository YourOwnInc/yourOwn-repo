import { Router } from 'express';
import { createSession } from '../repositories/session.repo';
import { createExperience, listExperiences } from '../repositories/experience-entry.repo';

const r = Router();

r.post('/seed', async (_req, res, next) => {
  try {
    const session = await createSession();
    await createExperience({
      sessionId: session.id,
      title: 'First Project',
      summary: 'Built a thing for the MVP',
      kind: 'PROJECT',
    });
    await createExperience({
      sessionId: session.id,
      title: 'CS Course',
      kind: 'EDUCATION',
    });

    const experiences = await listExperiences({ sessionId: session.id });
    res.json({ session, experiences });
  } catch (e) {
    next(e);
  }
});

export default r;
