import express from 'express';
import upload from '../utils/upload.js';
import { createAdmissionController } from '../controller/admissionController.js';

const router = express.Router();
const multiUpload = upload.fields([
  { name: 'passportPhotos', maxCount: 2 },
  { name: 'certificates', maxCount: 10 },
]);

/**
 * @swagger
 * /admissions:
 *   post:
 *     summary: Create a new admission
 *     description: Uploads passport photos and certificates along with admission details.
 *     tags: [Admissions]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               programmeLevel:
 *                 type: string
 *               programmeChoice:
 *                 type: string
 *               surname:
 *                 type: string
 *               firstname:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               placeOfBirth:
 *                 type: string
 *               gender:
 *                 type: string
 *               presentAddress:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               permanentAddress:
 *                 type: string
 *               postalAddress:
 *                 type: string
 *               nationality:
 *                 type: string
 *               nativeLanguage:
 *                 type: string
 *               placeDiffNationality:
 *                 type: boolean
 *               maritalStatus:
 *                 type: string
 *               religion:
 *                 type: string
 *               denomination:
 *                 type: string
 *               parentGuardian:
 *                 type: string
 *               emergencyContact:
 *                 type: string
 *               emergencyPhone:
 *                 type: string
 *               nextOfKin:
 *                 type: string
 *               nextOfKinPhone:
 *                 type: string
 *               financeInfo:
 *                 type: string
 *               healthInfo:
 *                 type: string
 *               academicReferee:
 *                 type: string
 *               academicProfession:
 *                 type: string
 *               academicInstitution:
 *                 type: string
 *               academicAddress:
 *                 type: string
 *               academicPhone:
 *                 type: string
 *               academicEmail:
 *                 type: string
 *               clergyReferee:
 *                 type: string
 *               clergyPosition:
 *                 type: string
 *               clergyChurch:
 *                 type: string
 *               clergyAddress:
 *                 type: string
 *               clergyPhone:
 *                 type: string
 *               clergyEmail:
 *                 type: string
 *               applicantSignature:
 *                 type: string
 *               applicantDate:
 *                 type: string
 *                 format: date
 *               education:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     institution:
 *                       type: string
 *                     from:
 *                       type: string
 *                       format: date
 *                     to:
 *                       type: string
 *                       format: date
 *                     qualification:
 *                       type: string
 *               title:
 *                 type: string
 *               otherNames:
 *                 type: string
 *               description:
 *                 type: string
 *               passportPhotos:
 *                 type: array
 *                 items:
 *                   type: string
 *               certificates:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Admission created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 admissionId:
 *                   type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', multiUpload, createAdmissionController);

export default router;