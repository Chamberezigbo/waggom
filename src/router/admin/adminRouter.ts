import express from 'express';
import { adminController } from '../../controller/admin/adminAuth.js';

import {
    createNewsController,
    listNewsController,
    getNewsController,
    updateNewsController,
    deleteNewsController
} from '../../controller/admin/newsController.js';

import {
    createEventController,
    listEventsController,
    getEventController,
    updateEventController,
    deleteEventController
} from '../../controller/admin/eventController.js';

import {
    listTestimoniesController,
    getTestimonyController,
    approveTestimonyController,
    deleteTestimonyController
} from '../../controller/admin/testimonyAdminController.js';

import {
    listAdmissionsController,
    getAdmissionController,
    approveAdmissionController,
    rejectAdmissionController,
    deleteAdmissionController
} from '../../controller/admin/admissionAdminController.js';

import { requireAdmin } from '../../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin login
 *     description: Authenticates an admin user.
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/login', adminController);

// News management routes
/**
 * @swagger
 * /admin/news:
 *   post:
 *     summary: Create news
 *     description: Creates a new news item.
 *     tags: [News]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: News created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 newsId:
 *                   type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/news', requireAdmin, createNewsController);

/**
 * @swagger
 * /admin/news:
 *   get:
 *     summary: List news
 *     description: Retrieves a list of news items.
 *     tags: [News]
 *     responses:
 *       200:
 *         description: A list of news items retrieved successfully
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
 *                   content:
 *                     type: string
 *       404:
 *         description: No news found
 *       500:
 *         description: Internal server error
 */
router.get('/news', requireAdmin, listNewsController);

/**
 * @swagger
 * /admin/news/{id}:
 *   get:
 *     summary: Get news by ID
 *     description: Retrieves a specific news item by ID.
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the news item
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: News item retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *       404:
 *         description: News not found
 *       500:
 *         description: Internal server error
 */
router.get('/news/:id', requireAdmin, getNewsController);

/**
 * @swagger
 * /admin/news/{id}:
 *   put:
 *     summary: Update news
 *     description: Updates an existing news item.
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the news item
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: News updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: News not found
 *       500:
 *         description: Internal server error
 */
router.put('/news/:id', requireAdmin, updateNewsController);

/**
 * @swagger
 * /admin/news/{id}:
 *   delete:
 *     summary: Delete news
 *     description: Deletes a news item by ID.
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the news item
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: News deleted successfully
 *       404:
 *         description: News not found
 *       500:
 *         description: Internal server error
 */
router.delete('/news/:id', requireAdmin, deleteNewsController);

// Event management routes
/**
 * @swagger
 * /admin/events:
 *   post:
 *     summary: Create event
 *     description: Creates a new event.
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 eventId:
 *                   type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/events', requireAdmin, createEventController);

/**
 * @swagger
 * /admin/events:
 *   get:
 *     summary: List events
 *     description: Retrieves a list of events.
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
router.get('/events', requireAdmin, listEventsController);

/**
 * @swagger
 * /admin/events/{id}:
 *   get:
 *     summary: Get event by ID
 *     description: Retrieves a specific event by ID.
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the event
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date-time
 *                 location:
 *                   type: string
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
router.get('/events/:id', requireAdmin, getEventController);

/**
 * @swagger
 * /admin/events/{id}:
 *   put:
 *     summary: Update event
 *     description: Updates an existing event.
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the event
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
router.put('/events/:id', requireAdmin, updateEventController);

/**
 * @swagger
 * /admin/events/{id}:
 *   delete:
 *     summary: Delete event
 *     description: Deletes an event by ID.
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the event
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
router.delete('/events/:id', requireAdmin, deleteEventController);

// Testimony management routes
/**
 * @swagger
 * /admin/testimonies:
 *   get:
 *     summary: List testimonies
 *     description: Retrieves a list of testimonies.
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
 *                   message:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: No testimonies found
 *       500:
 *         description: Internal server error
 */
router.get('/testimonies', requireAdmin, listTestimoniesController);

/**
 * @swagger
 * /admin/testimonies/{id}:
 *   get:
 *     summary: Get testimony by ID
 *     description: Retrieves a specific testimony by ID.
 *     tags: [Testimonies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the testimony
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Testimony retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 message:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Testimony not found
 *       500:
 *         description: Internal server error
 */
router.get('/testimonies/:id', requireAdmin, getTestimonyController);

/**
 * @swagger
 * /admin/testimonies/{id}/approve:
 *   post:
 *     summary: Approve testimony
 *     description: Approves a testimony by ID.
 *     tags: [Testimonies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the testimony
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Testimony approved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Testimony not found
 *       500:
 *         description: Internal server error
 */
router.post('/testimonies/:id/approve', requireAdmin, approveTestimonyController);

/**
 * @swagger
 * /admin/testimonies/{id}:
 *   delete:
 *     summary: Delete testimony
 *     description: Deletes a testimony by ID.
 *     tags: [Testimonies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the testimony
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Testimony deleted successfully
 *       404:
 *         description: Testimony not found
 *       500:
 *         description: Internal server error
 */
router.delete('/testimonies/:id', requireAdmin, deleteTestimonyController);

// Admission management routes
/**
 * @swagger
 * /admin/admissions:
 *   get:
 *     summary: List admissions
 *     description: Retrieves a list of admissions.
 *     tags: [Admissions]
 *     responses:
 *       200:
 *         description: A list of admissions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   surname:
 *                     type: string
 *                   firstname:
 *                     type: string
 *                   dateOfBirth:
 *                     type: string
 *                     format: date
 *                   status:
 *                     type: string
 *       404:
 *         description: No admissions found
 *       500:
 *         description: Internal server error
 */
router.get('/admissions', requireAdmin, listAdmissionsController);

/**
 * @swagger
 * /admin/admissions/{id}:
 *   get:
 *     summary: Get admission by ID
 *     description: Retrieves a specific admission by ID.
 *     tags: [Admissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the admission
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Admission retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 surname:
 *                   type: string
 *                 firstname:
 *                   type: string
 *                 dateOfBirth:
 *                   type: string
 *                   format: date
 *                 status:
 *                   type: string
 *       404:
 *         description: Admission not found
 *       500:
 *         description: Internal server error
 */
router.get('/admissions/:id', requireAdmin, getAdmissionController);

/**
 * @swagger
 * /admin/admissions/{id}/approve:
 *   post:
 *     summary: Approve admission
 *     description: Approves an admission by ID.
 *     tags: [Admissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the admission
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Admission approved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Admission not found
 *       500:
 *         description: Internal server error
 */
router.post('/admissions/:id/approve', requireAdmin, approveAdmissionController);

/**
 * @swagger
 * /admin/admissions/{id}/reject:
 *   post:
 *     summary: Reject admission
 *     description: Rejects an admission by ID.
 *     tags: [Admissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the admission
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Admission rejected successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Admission not found
 *       500:
 *         description: Internal server error
 */
router.post('/admissions/:id/reject', requireAdmin, rejectAdmissionController);

/**
 * @swagger
 * /admin/admissions/{id}:
 *   delete:
 *     summary: Delete admission
 *     description: Deletes an admission by ID.
 *     tags: [Admissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the admission
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Admission deleted successfully
 *       404:
 *         description: Admission not found
 *       500:
 *         description: Internal server error
 */
router.delete('/admissions/:id', requireAdmin, deleteAdmissionController);

export default router;