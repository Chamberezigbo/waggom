import express from 'express';
import upload from '../utils/upload.js';
import { createTestimonyController } from '../controller/testimonyController.js';
import { listTestimoniesController } from '../controller/testimonyController.js';   

const router = express.Router();

/**
 * @swagger
 * /testimonies:
 *   post:
 *     summary: Create a new testimony
 *     description: Uploads a testimony along with an optional photo.
 *     tags: [Testimonies]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Testimony created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 testimonyId:
 *                   type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', upload.single('photo'), createTestimonyController);

/**
 * @swagger
 * /testimonies:
 *   get:
 *     summary: Retrieve a list of testimonies
 *     description: Fetches all testimonies from the database.
 *     tags: [Testimonies]
 *     responses:
 *       200:
 *         description: A list of testimonies retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   message:
 *                     type: string
 *                   photoUrl:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: No testimonies found
 *       500:
 *         description: Internal server error
 */
router.get('/', listTestimoniesController);

export default router;