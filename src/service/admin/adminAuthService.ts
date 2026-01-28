import { prisma } from '../../config/prisma.js';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppError } from '../../utils/AppError.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export async function loginAdmin(email: string, password: string) {
  const normalized = email.trim().toLowerCase();

  const admin = await prisma.admin.findUnique({ where: { email: normalized } });


  if (!admin) return null;

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) return null;

  let accessToken: string;
  try {
    accessToken = jwt.sign(
      { sub: admin.id, email: admin.email, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '1d' } // a day
    );
  } catch (err) {
    console.error('JWT generation failed:', err);
    throw new AppError('Token generation failed', 500, err);
  }

  console.log('Login successful for admin:', admin.email);
  return {
    accessToken,
    tokenType: 'Bearer',
    expiresIn: 'a day',
  };
}