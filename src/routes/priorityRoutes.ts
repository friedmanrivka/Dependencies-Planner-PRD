import { Router } from 'express';
import {getAllPriority } from '../controllers/priorityController';
const router = Router();
router.get('/priority', getAllPriority);


export default router;