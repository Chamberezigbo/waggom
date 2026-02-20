import { prisma } from "../config/prisma.js";

export async function listApprovedEvent() {
    return prisma.event.findMany({
        orderBy: { createdAt: 'desc' },
    });
}