import type { Request, Response, NextFunction } from 'express';
import multer from 'multer';

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('Unhandled error:', err); // <-- log everything for debugging

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

  // Handle custom/application errors without relying on specific error classes.
  if (typeof err === 'object' && err !== null) {
    const anyErr = err as any;
    const statusCode = typeof anyErr.statusCode === 'number' ? anyErr.statusCode : undefined;

    if (typeof statusCode === 'number' && statusCode >= 400 && statusCode < 600) {
      const message =
        typeof anyErr.message === 'string'
          ? anyErr.message
          : statusCode === 400
            ? 'Bad Request'
            : statusCode === 401
              ? 'Unauthorized'
              : 'Request failed';

      return res.status(statusCode).json({
        success: false,
        message,
        ...(anyErr.details !== undefined ? { details: anyErr.details } : {}),
      });
    }
  }

  const isDev = process.env.NODE_ENV !== 'production';
  return res.status(500).json({
    error: 'Internal Server Error',
    ...(isDev ? { message: err instanceof Error ? err.message : String(err) } : {}),
  });
}