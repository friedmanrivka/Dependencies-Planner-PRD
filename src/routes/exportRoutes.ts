import { Router } from 'express';
import { exportToCSV } from '../services/exportService';

const router = Router();
router.get('/export/csv', exportToCSV);


export default router;