import { prisma } from '../config/prisma.js';

export async function createAdmission(data: any) {
  // Save file URLs for photos/certificates
  const passportPhotos = data.passportPhotos?.map((f: Express.Multer.File) => ({ fileUrl: `/uploads/${f.filename}` })) ?? [];
  const certificates = data.certificates?.map((f: Express.Multer.File) => ({ fileUrl: `/uploads/${f.filename}` })) ?? [];
  const education = data.education?.map((e: any) => ({
    institution: e.institution,
    from: new Date(e.from),
    to: new Date(e.to),
    qualification: e.qualification,
  })) ?? [];

  return prisma.admission.create({
    data: {
      ...data,
      applicantDate: new Date(data.applicantDate),
      placeDiffNationality: data.placeDiffNationality === 'true' || data.placeDiffNationality === true,
      education: { create: education },
      certificates: { create: certificates },
      passportPhotos: { create: passportPhotos }, // <-- fix here
    },
    include: { education: true, certificates: true, passportPhotos: true },
  });
}