import express from 'express';
import { studentLoginController } from '../controller/Student/studentAuthController.js';
// auth middleware
import { requireStudent } from '../middleware/auth.js';
import { getStudentNewsController } from '../controller/Student/studentNewsController.js';

const router = express.Router();

/**
 * @swagger
 * /students/login:
 *   post:
 *     summary: Student login with email
 *     description: Authenticates a student by email and checks admission status.
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: student@example.com
 *     responses:
 *       200:
 *         description: Login successful - admission approved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                     admission:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         surname:
 *                           type: string
 *                         firstname:
 *                           type: string
 *                         email:
 *                           type: string
 *                         status:
 *                           type: string
 *       400:
 *         description: Bad request - invalid email format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Valid email is required"
 *       401:
 *         description: Unauthorized - admission not found or status is pending/rejected
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Your admission status is still pending. Please check back later."
 *       500:
 *         description: Internal server error
 */
router.post('/login', studentLoginController);

/**
 * @swagger
 * /students/news:
 *   get:
 *     summary: Get news for authenticated student
 *     description: Returns news items where category is `student`. Only approved admissions can access.
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student news fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized (missing/invalid token or admission pending/rejected)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: false }
 *                 message: { type: string }
 */
router.get('/news', requireStudent, getStudentNewsController);

export default router;