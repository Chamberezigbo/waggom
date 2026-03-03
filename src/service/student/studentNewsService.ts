import { prisma } from "../../config/prisma.js";

export type StudentNewsQuery = {
  page?: number;
  pageSize?: number;
  categories?: string[]; // optional filter (OR)
  search?: string; // optional title/summary search
  location?: string; // optional location filter
  from?: string; // optional start date filter
  to?: string; // optional end date filter
  upcomingOnly?: boolean;
};

export async function getNewsForStudent(query: StudentNewsQuery) {
  const page = Number.isFinite(query.page) && (query.page as number) > 0 ? (query.page as number) : 1;
  const pageSizeRaw =
    Number.isFinite(query.pageSize) && (query.pageSize as number) > 0 ? (query.pageSize as number) : 10;

  // cap to prevent huge responses
  const pageSize = Math.min(pageSizeRaw, 50);

  const skip = (page - 1) * pageSize;

  const categories = (query.categories ?? [])
    .map((c) => c.trim())
    .filter(Boolean);

  const search = (query.search ?? "").trim();

  const where = {
    ...(categories.length > 0 ? { category: { in: categories } } : {}), // if empty -> ALL categories
    ...(search
      ? {
          OR: [
            { title: { contains: search } },
            { summary: { contains: search } },
          ],
        }
      : {}),
  } as const;

  const [total, data] = await prisma.$transaction([
    prisma.news.count({ where }),
    prisma.news.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
  ]);

  return {
    meta: {
      page,
      pageSize,
      total,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
      categories: categories.length ? categories : null,
      search: search || null,
    },
    data,
  };
}

function toDateOrUndefined(value?: string): Date | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

export async function getEventsForStudent(query: StudentNewsQuery) {
  const page = Number.isFinite(query.page) && (query.page as number) > 0 ? (query.page as number) : 1;
  const pageSizeRaw =
    Number.isFinite(query.pageSize) && (query.pageSize as number) > 0 ? (query.pageSize as number) : 10;

  const pageSize = Math.min(pageSizeRaw, 50);
  const skip = (page - 1) * pageSize;

  const search = (query.search ?? "").trim();
  const location = (query.location ?? "").trim();

  const from = toDateOrUndefined(query.from);
  const to = toDateOrUndefined(query.to);

  const upcomingOnly = query.upcomingOnly === true;

  const now = new Date();

  // NOTE: assumes your Event model has fields: title, description, location, date, createdAt
  const where = {
    ...(upcomingOnly ? { date: { gte: now } } : {}),
    ...(from || to
      ? {
          date: {
            ...(from ? { gte: from } : {}),
            ...(to ? { lte: to } : {}),
          },
        }
      : {}),
    ...(location
      ? {
          location: { contains: location },
        }
      : {}),
    ...(search
      ? {
          OR: [
            { title: { contains: search } },
            { description: { contains: search } },
            { location: { contains: search } },
          ],
        }
      : {}),
  } as const;

  const [total, data] = await prisma.$transaction([
    prisma.event.count({ where }),
    prisma.event.findMany({
      where,
      orderBy: { date: "asc" },
      skip,
      take: pageSize,
    }),
  ]);

  return {
    meta: {
      page,
      pageSize,
      total,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
      search: search || null,
      location: location || null,
      from: from ? from.toISOString() : null,
      to: to ? to.toISOString() : null,
      upcomingOnly,
    },
    data,
  };
}