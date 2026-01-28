import type { Request, Response, NextFunction } from 'express';
import { createTestimony } from '../service/testimonyService.js';

export const createTestimonyController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, message } = req.body;
    const photo = req.file;
    const photoUrl = photo ? `/uploads/${photo.filename}` : undefined;
    const result = await createTestimony({ name, email, message, photoUrl });
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};