import type { Request, Response, NextFunction } from "express";
import { getNewsForStudent, getEventsForStudent } from "../../service/student/studentNewsService.js";

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

export async function getStudentEventsController(req: Request, res: Response, next: NextFunction) {
  try {
    const page = req.query.page ? Number(req.query.page) : undefined;
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : undefined;

    const search = (req.query.search as string | undefined) ?? undefined;
    const location = (req.query.location as string | undefined) ?? undefined;

    const from = (req.query.from as string | undefined) ?? undefined;
    const to = (req.query.to as string | undefined) ?? undefined;

    const upcomingOnly =
      typeof req.query.upcomingOnly === "string"
        ? req.query.upcomingOnly === "true"
        : undefined;

    const result = await getEventsForStudent({
      ...(page !== undefined ? { page } : {}),
      ...(pageSize !== undefined ? { pageSize } : {}),
      ...(search !== undefined ? { search } : {}),
      ...(location !== undefined ? { location } : {}),
      ...(from !== undefined ? { from } : {}),
      ...(to !== undefined ? { to } : {}),
      ...(upcomingOnly !== undefined ? { upcomingOnly } : {}),
    });

    return res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
}