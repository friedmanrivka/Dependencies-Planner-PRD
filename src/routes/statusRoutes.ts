import { Router } from 'express';
import { getAllStatus } from '../controllers/statusController';
const router = Router();
router.get('/status', getAllStatus);


export default router;