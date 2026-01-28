import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/AppError.js';

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev_secret';

export interface AuthRequest extends Request {
  user?: { sub: string; email?: string; role?: string };
}

export function requireAdmin(req: AuthRequest, _res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Missing or invalid Authorization header'));
  }

  const token = auth.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET) as unknown as { sub: string; email?: string; role?: string };
    if (payload.role !== 'admin') return next(new UnauthorizedError('Insufficient permissions'));
    req.user = payload;
    next();
  } catch (err) {
    return next(new UnauthorizedError('Invalid or expired token'));
  }
}