import { prisma } from '../../config/prisma.js';
import { NotFoundError } from '../../utils/AppError.js';

export async function listAdmissions(status?: string) {
  return prisma.admission.findMany({
    where: status ? { status } : {},
    orderBy: { createdAt: 'desc' },
    include: { education: true, certificates: true, passportPhotos: true },
  });
}

export async function getAdmission(id: string) {
  const admission = await prisma.admission.findUnique({
    where: { id },
    include: { education: true, certificates: true, passportPhotos: true },
  });
  if (!admission) throw new NotFoundError('Admission not found');
  return admission;
}

export async function approveAdmission(id: string) {
  const admission = await prisma.admission.findUnique({ where: { id } });
  if (!admission) throw new NotFoundError('Admission not found');
  return prisma.admission.update({ where: { id }, data: { status: 'approved' } });
}

export async function rejectAdmission(id: string) {
  const admission = await prisma.admission.findUnique({ where: { id } });
  if (!admission) throw new NotFoundError('Admission not found');
  return prisma.admission.update({ where: { id }, data: { status: 'rejected' } });
}

export async function deleteAdmission(id: string) {
  const admission = await prisma.admission.findUnique({ where: { id } });
  if (!admission) throw new NotFoundError('Admission not found');
  await prisma.admission.delete({ where: { id } });
  return { success: true };
}