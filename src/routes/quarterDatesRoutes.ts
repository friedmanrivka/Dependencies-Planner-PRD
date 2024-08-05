import { Router } from 'express'
import {  setCurrentQuarter,getCurrentQuarter } from '../controllers/quarterDatesController';


const router = Router();
router.post('/set-current-quarter', setCurrentQuarter);
router.get('/get-current-quarter', getCurrentQuarter);

export default router;