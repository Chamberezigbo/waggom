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
 *     summary: Get news for authenticated students (all categories)
 *     description: Returns news with pagination. Optionally filter by one or more categories.
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, example: 1 }
 *         description: Page number (1-based)
 *       - in: query
 *         name: pageSize
 *         schema: { type: integer, example: 10 }
 *         description: Items per page (max 50)
 *       - in: query
 *         name: categories
 *         schema: { type: string, example: "student,academics" }
 *         description: Comma-separated categories to include (OR filter)
 *       - in: query
 *         name: search
 *         schema: { type: string, example: "portal" }
 *         description: Search in title/summary
 *     responses:
 *       200:
 *         description: News fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 meta:
 *                   type: object
 *                   properties:
 *                     page: { type: integer }
 *                     pageSize: { type: integer }
 *                     total: { type: integer }
 *                     totalPages: { type: integer }
 *                     categories: { type: array, items: { type: string }, nullable: true }
 *                     search: { type: string, nullable: true }
 *                 data:
 *                   type: array
 *                   items: { type: object }
 *       401:
 *         description: Unauthorized (missing/invalid token or admission pending/rejected)
 */
router.get('/news', requireStudent, getStudentNewsController);

export default router;