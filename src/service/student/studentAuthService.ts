import { prisma } from '../../config/prisma.js';
import { BadRequestError, UnauthorizedError } from '../../utils/AppError.js';

export async function studentLogin(email: string) {
  if (!email || !email.includes('@')) {
    throw new BadRequestError('Valid email is required');
  }

  const admission = await prisma.admission.findFirst({
    where: { email },
    orderBy: { createdAt: 'desc' }
  });

  if (!admission) {
    throw new UnauthorizedError('No admission application found with this email');
  }

  if (admission.status === 'pending') {
    throw new UnauthorizedError('Your admission status is still pending. Please check back later.');
  }

  if (admission.status === 'rejected') {
    throw new UnauthorizedError('Your admission application has been rejected.');
  }

  // Status is 'approved'
  const token = generateToken(admission.id, email);
  return { token, admission };
}

function generateToken(admissionId: string, email: string): string {
  // Use JWT or your preferred token generation method
  const payload = { admissionId, email, iat: Date.now() };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}