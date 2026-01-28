import type { Request, Response, NextFunction } from 'express';
import {
  listAdmissions,
  getAdmission,
  approveAdmission,
  rejectAdmission,
  deleteAdmission,
} from '../../service/admin/admissionAdminService.js';

export const listAdmissionsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.query;
    const result = await listAdmissions(typeof status === 'string' ? status : undefined);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

export const getAdmissionController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const  id = req.params.id as string;
    const result = await getAdmission(id);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

export const approveAdmissionController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const result = await approveAdmission(id);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

export const rejectAdmissionController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const result = await rejectAdmission(id);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

export const deleteAdmissionController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const result = await deleteAdmission(id);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};