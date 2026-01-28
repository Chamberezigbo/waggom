import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError.js';
import multer from 'multer';

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

  if (
    err instanceof multer.MulterError ||
    (typeof err === 'object' &&
      err !== null &&
      'message' in err &&
      typeof (err as any).message === 'string' &&
      (err as any).message.includes('Multipart: Boundary not found'))
  ) {
    return res.status(400).json({ error: 'Invalid file upload request. Please use multipart/form-data.' });
  }

  const isDev = process.env.NODE_ENV !== 'production';
  return res.status(500).json({
    error: 'Internal Server Error',
    ...(isDev ? { message: err instanceof Error ? err.message : String(err) } : {}),
  });
}