import { Router } from 'express';
import {getRequestorNames } from '../controllers/productManagerController';

const router = Router();
router.get('/requestor-names', getRequestorNames);

export default router;