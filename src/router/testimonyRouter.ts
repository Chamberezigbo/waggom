import express from 'express';
import upload from '../utils/upload.js';
import { createTestimonyController } from '../controller/testimonyController.js';

const router = express.Router();

router.post('/', upload.single('photo'), createTestimonyController);

export default router;