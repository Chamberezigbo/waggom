import { prisma } from '../../config/prisma.js';
import type { EventCreateDto, EventUpdateDto } from '../../dto/AdminLoginDto.js';
import { NotFoundError } from '../../utils/AppError.js';

export async function createEvent(dto: EventCreateDto) {
  return prisma.event.create({
    data: {
      ...dto,
      date: new Date(dto.date),
    },
  });
}

export async function getEvent(id: string) {
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) throw new NotFoundError('Event not found');
  return event;
}

export async function listEvents() {
  return prisma.event.findMany({ orderBy: { date: 'asc' } });
}

export async function updateEvent(id: string, dto: EventUpdateDto) {
  const existing = await prisma.event.findUnique({ where: { id } });
  if (!existing) throw new NotFoundError('Event not found');
  return prisma.event.update({
    where: { id },
    data: {
      ...dto,
      ...(dto.date ? { date: new Date(dto.date) } : {}),
    },
  });
}

export async function deleteEvent(id: string) {
  const existing = await prisma.event.findUnique({ where: { id } });
  if (!existing) throw new NotFoundError('Event not found');
  await prisma.event.delete({ where: { id } });
  return { success: true };
}