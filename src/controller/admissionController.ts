import type { Request, Response, NextFunction } from 'express';
import { createAdmission } from '../service/admissionService.js';

export const createAdmissionController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const data = {
      ...req.body,
      passportPhotos: files?.passportPhotos,
      certificates: files?.certificates,
      education: JSON.parse(req.body.education || '[]'),
    };
    const result = await createAdmission(data);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};