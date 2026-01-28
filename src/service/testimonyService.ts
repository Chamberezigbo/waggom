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
    data: { name, email, message, photoUrl },
  });
}