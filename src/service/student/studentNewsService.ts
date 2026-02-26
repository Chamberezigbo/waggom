import { prisma } from "../../config/prisma.js";

export async function getNewsForStudent() {
  // Requirement: "news with category of student"
  return prisma.news.findMany({
    where: { category: "student" },
    orderBy: { createdAt: "desc" },
  });
}