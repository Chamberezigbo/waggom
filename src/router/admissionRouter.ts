import express from 'express';
import upload from '../utils/upload.js';
import { createAdmissionController } from '../controller/admissionController.js';

const router = express.Router();
const multiUpload = upload.fields([
  { name: 'passportPhotos', maxCount: 2 },
  { name: 'certificates', maxCount: 10 },
]);

router.post('/', multiUpload, createAdmissionController);

export default router;