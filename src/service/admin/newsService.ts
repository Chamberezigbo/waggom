import { prisma } from '../../config/prisma.js';
import type { NewsCreateDto,NewsUpdateDto } from '../../dto/AdminLoginDto.js';
import { NotFoundError } from '../../utils/AppError.js';

export async function createNews(dto: NewsCreateDto) {
  const news = await prisma.news.create({ data: dto });
  return news;
}

export async function getNews(id: string) {
  const news = await prisma.news.findUnique({ where: { id } });
  if (!news) throw new NotFoundError('News not found');
  return news;
}

export async function listNews() {
  return prisma.news.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function updateNews(id: string, dto: NewsUpdateDto) {
  const existing = await prisma.news.findUnique({ where: { id } });
  if (!existing) throw new NotFoundError('News not found');
  return prisma.news.update({ where: { id }, data: dto });
}

export async function deleteNews(id: string) {
  const existing = await prisma.news.findUnique({ where: { id } });
  if (!existing) throw new NotFoundError('News not found');
  await prisma.news.delete({ where: { id } });
  return { success: true };
}