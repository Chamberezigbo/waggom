import { prisma } from '../config/prisma.js';

export async function createTestimony({
  name,
  email,
  message,
  photoUrl,
}: {
  name: string;
  email: string;
  message: string;
  photoUrl?: string | undefined; // <-- allow undefined
}) {
  return prisma.testimony.create({
    data: { name, email, message, photoUrl: photoUrl ?? null }, // <-- fix here
  });
}

export async function listTestimonies() {
  return prisma.testimony.findMany({
    where: {status: 'approved'},
    orderBy: { createdAt: 'desc' },
  });
}
