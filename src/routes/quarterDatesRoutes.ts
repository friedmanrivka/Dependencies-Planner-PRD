import { Router } from 'express'
import {  getQuarterDates } from '../controllers/quarterDatesController';


const router = Router();
router.get('/quarter-dates', getQuarterDates);
export default router;