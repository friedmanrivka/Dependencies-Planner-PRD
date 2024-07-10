
import { Router } from 'express';
import {getRequestorGroup } from '../controllers/groupController';

const router = Router();
router.get('/requestor-Group', getRequestorGroup);

export default router;