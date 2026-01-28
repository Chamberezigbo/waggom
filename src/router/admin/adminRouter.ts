import express from 'express';
import { adminController } from '../../controller/admin/adminAuth.js';

import{
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

import{
    listTestimoniesController,
    getTestimonyController,
    approveTestimonyController,
    deleteTestimonyController
} from '../../controller/admin/testimonyAdminController.js';

import { requireAdmin } from '../../middleware/auth.js';

const router = express.Router();

router.post('/login', adminController);

// News management routes
router.post('/news', requireAdmin, createNewsController);
router.get('/news', requireAdmin, listNewsController);
router.get('/news/:id', requireAdmin, getNewsController);
router.put('/news/:id', requireAdmin, updateNewsController);
router.delete('/news/:id', requireAdmin, deleteNewsController);

// Event management routes
router.post('/events', requireAdmin, createEventController);
router.get('/events', requireAdmin, listEventsController);
router.get('/events/:id', requireAdmin, getEventController);
router.put('/events/:id', requireAdmin, updateEventController);
router.delete('/events/:id', requireAdmin, deleteEventController);

// Testimony management routes
router.get('/testimonies', requireAdmin, listTestimoniesController);
router.get('/testimonies/:id', requireAdmin, getTestimonyController);
router.post('/testimonies/:id/approve', requireAdmin, approveTestimonyController);
router.delete('/testimonies/:id', requireAdmin, deleteTestimonyController);


export default router;