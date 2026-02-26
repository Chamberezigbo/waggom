import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/AppError.js';
import { prisma } from '../config/prisma.js'

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev_secret';

type StudentTokenPayload ={
  admissionId: string;
  email: string;
}

export interface AuthRequest extends Request {
  user?: { sub: string; email?: string; role?: string };
}

export function requireAdmin(req: AuthRequest, _res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Missing or invalid Authorization header'));
  }

  const token = auth.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET) as unknown as { sub: string; email?: string; role?: string };
    if (payload.role !== 'admin') return next(new UnauthorizedError('Insufficient permissions'));
    req.user = payload;
    next();
  } catch (err) {
    return next(new UnauthorizedError('Invalid or expired token'));
  }
}

function decodeStudentToken(rawAuthHeader: string | undefined): StudentTokenPayload {
  if (!rawAuthHeader) throw new Error("Missing Authorization header");

  const token = rawAuthHeader.startsWith("Bearer ")
    ? rawAuthHeader.slice("Bearer ".length).trim()
    : rawAuthHeader.trim();

  const json = Buffer.from(token, "base64").toString("utf8");
  const payload = JSON.parse(json) as Partial<StudentTokenPayload>;

  if (!payload.admissionId || !payload.email) throw new Error("Invalid token payload");
  return { admissionId: payload.admissionId, email: payload.email };
}

export async function requireStudent(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = decodeStudentToken(req.header("Authorization"));

    const admission = await prisma.admission.findFirst({
      where: { id: payload.admissionId, email: payload.email },
      select: { id: true, email: true, status: true },
    });

    if (!admission) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (admission.status === "pending") {
      return res
        .status(401)
        .json({ success: false, message: "Your admission status is still pending. Please check back later." });
    }

    if (admission.status === "rejected") {
      return res.status(401).json({ success: false, message: "Your admission application has been rejected." });
    }

    // attach for downstream usage if needed
    (req as any).student = admission;

    next();
  } catch {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
}