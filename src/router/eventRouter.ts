import express from 'express';
import { getEventController } from '../controller/eventController.js';

const router = express.Router();

router.get('/', getEventController);

export default router;