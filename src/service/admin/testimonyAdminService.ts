import { prisma } from '../../config/prisma.js';
import { NotFoundError } from '../../utils/AppError.js';

export async function listTestimonies(status?: string) {
  return prisma.testimony.findMany({
    where: status ? { status } : {},
    orderBy: { createdAt: 'desc' },
  });
}

export async function getTestimony(id: string) {
  const testimony = await prisma.testimony.findUnique({ where: { id } });
  if (!testimony) throw new NotFoundError('Testimony not found');
  return testimony;
}

export async function approveTestimony(id: string) {
  const testimony = await prisma.testimony.findUnique({ where: { id } });
  if (!testimony) throw new NotFoundError('Testimony not found');
  return prisma.testimony.update({ where: { id }, data: { status: 'approved' } });
}

export async function deleteTestimony(id: string) {
  const testimony = await prisma.testimony.findUnique({ where: { id } });
  if (!testimony) throw new NotFoundError('Testimony not found');
  await prisma.testimony.delete({ where: { id } });
  return { success: true };
}