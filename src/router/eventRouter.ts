import express from 'express';
import { getEventController } from '../controller/eventController.js';

const router = express.Router();

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Retrieve a list of events
 *     description: Fetches all events from the database.
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: A list of events retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   location:
 *                     type: string
 *       404:
 *         description: No events found
 *       500:
 *         description: Internal server error
 */
router.get('/', getEventController);

export default router;