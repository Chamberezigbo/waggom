import type { Express } from 'express';

export interface AdminLoginDto {
    email: string;
    password: string;
}

export interface NewsCreateDto {
  title: string;
  summary?: string;
  category?: string;
  body: string;
}

export interface NewsUpdateDto {
  title?: string;
  summary?: string;
  category?: string;
  body?: string;
}

export interface EventCreateDto {
  title: string;
  date: string; // ISO string
  location: string;
  description: string;
}

export interface EventUpdateDto {
  title?: string;
  date?: string;
  location?: string;
  description?: string;
}

export interface TestimonyCreateDto {
  name: string;
  email: string;
  message: string;
  photo?: Express.Multer.File;
}

export interface EducationDto {
  institution: string;
  from: string; // ISO date
  to: string;   // ISO date
  qualification: string;
}

export interface AdmissionCreateDto {
  programmeLevel: string;
  programmeChoice: string;
  surname: string;
  firstname: string;
  title?: string;
  otherNames?: string;
  dateOfBirth: string;
  placeOfBirth: string;
  gender: string;
  presentAddress: string;
  email: string;
  phone: string;
  permanentAddress: string;
  postalAddress: string;
  nationality: string;
  nativeLanguage: string;
  placeDiffNationality: boolean;
  maritalStatus: string;
  religion: string;
  denomination: string;
  parentGuardian: string;
  emergencyContact: string;
  emergencyPhone: string;
  nextOfKin: string;
  nextOfKinPhone: string;
  financeInfo: string;
  healthInfo: string;
  description?: string;
  academicReferee: string;
  academicProfession: string;
  academicInstitution: string;
  academicAddress: string;
  academicPhone: string;
  academicEmail: string;
  clergyReferee: string;
  clergyPosition: string;
  clergyChurch: string;
  clergyAddress: string;
  clergyPhone: string;
  clergyEmail: string;
  applicantSignature: string;
  applicantDate: string;
  education: EducationDto[];
  certificates?: Express.Multer.File[];
  passportPhotos?: Express.Multer.File[];
}