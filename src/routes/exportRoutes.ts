import { Router } from 'express';
// // import { exportToGoogleSheets } from '../services/exportService';

// const router = Router();

// // router.get('/export', exportToGoogleSheets);

// export default router;


import { exportToCSV } from '../services/exportService';

const router = Router();
router.get('/export/csv', exportToCSV);


export default router;