import { prisma } from "../../config/prisma.js";

export type StudentNewsQuery = {
  page?: number;
  pageSize?: number;
  categories?: string[]; // optional filter (OR)
  search?: string; // optional title/summary search
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