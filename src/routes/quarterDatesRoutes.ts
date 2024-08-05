import { Router } from 'express'
import {  setCurrentQuarter,getCurrentQuarter,getQ} from '../controllers/quarterDatesController';


const router = Router();
router.post('/set-current-quarter', setCurrentQuarter);
router.get('/get-current-quarter', getCurrentQuarter);
router.get('/getQ', getQ);


export default router;