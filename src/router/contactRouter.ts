import express from "express";
import { contactUsController } from "../controller/contactController.js";

const router = express.Router();

/**
 * @swagger
 * /contact-us:
 *   post:
 *     summary: Contact us (send email)
 *     description: Sends an email to the church admin mailbox when a user submits the contact form.
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fullName, email, message]
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               message:
 *                 type: string
 *                 example: Hello, I would like to know more about your services.
 *     responses:
 *       200:
 *         description: Email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Message sent successfully }
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: false }
 *                 message: { type: string, example: Valid email is required }
 *       500:
 *         description: Server error sending email
 */
router.post("/", contactUsController);

export default router;