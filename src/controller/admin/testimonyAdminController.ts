import type { Request, Response, NextFunction } from 'express';
import {
  listTestimonies,
  getTestimony,
  approveTestimony,
  deleteTestimony,
} from '../../service/admin/testimonyAdminService.js';

export const listTestimoniesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.query;
    const result = await listTestimonies(typeof status === 'string' ? status : undefined);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

export const getTestimonyController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const  id  = req.params .id as string;
    const result = await getTestimony(id);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

export const approveTestimonyController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const  id  = req.params .id as string;
    const result = await approveTestimony(id);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

export const deleteTestimonyController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const  id  = req.params .id as string;
    const result = await deleteTestimony(id);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};