import type { Request, Response, NextFunction } from "express";
import { getNewsForStudent } from "../../service/student/studentNewsService.js";

function parseCategories(req: Request): string[] {
  // supports:
  // ?categories=student,academics
  // ?category=student
  const categoriesRaw =
    (req.query.categories as string | undefined) ?? (req.query.category as string | undefined);

  if (!categoriesRaw) return [];
  return categoriesRaw.split(",").map((s) => s.trim()).filter(Boolean);
}

export async function getStudentNewsController(req: Request, res: Response, next: NextFunction) {
  try {
    const page = req.query.page ? Number(req.query.page) : undefined;
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : undefined;
    const search = (req.query.search as string | undefined) ?? undefined;

    const result = await getNewsForStudent({
      categories: parseCategories(req),
      ...(page !== undefined ? { page } : {}),
      ...(pageSize !== undefined ? { pageSize } : {}),
      ...(search !== undefined ? { search } : {}),
    });

    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
}