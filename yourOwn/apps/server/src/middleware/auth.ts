import { Request, Response, NextFunction } from 'express';
import { JwtEngine } from '../lib/auth/jwt.engine';

// Extend Express Request type properly
export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    sessionId: string;
    userId: string;
    role: 'USER' | 'ADMIN' | 'GUEST';
  };
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ 
      error: 'AUTHENTICATION_REQUIRED',
      message: 'Missing or malformed access token' 
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = JwtEngine.verify(token);
    
    // Attach structured data to the request
    (req as AuthenticatedRequest).user = {
      id: payload.sub,
      sessionId: payload.sessionId,
      userId: payload.userId || '',
      role: payload.role,
    };

    next();
  } catch (error) {
    // Distinguish between expired and tampered tokens in logs, but keep client response generic for security
    console.error('[Auth] Token verification failed:', error);
    return res.status(401).json({ 
      error: 'INVALID_TOKEN',
      message: 'Your session has expired or the token is invalid' 
    });
  }
};