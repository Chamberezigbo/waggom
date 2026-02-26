import type { Request, Response, NextFunction } from "express";
import { getNewsForStudent } from "../../service/student/studentNewsService.js";

export async function getStudentNewsController(req: Request, res: Response, next: NextFunction) {
  try {
    const news = await getNewsForStudent();
    res.json({ success: true, data: news });
  } catch (err) {
    next(err);
  }
}