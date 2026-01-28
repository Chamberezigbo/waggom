import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError.js';

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('Unhandled error:', err); // <-- log everything for debugging

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      details: err.details,
    });
  }

  const isDev = process.env.NODE_ENV !== 'production';
  return res.status(500).json({
    error: 'Internal Server Error',
    ...(isDev ? { message: err instanceof Error ? err.message : String(err) } : {}),
  });
}