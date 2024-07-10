import { Router } from 'express';
import {getAllFinalDesicion} from '../controllers/filnalDesicionController'
const router = Router();
router.get('/finalDecision', getAllFinalDesicion);


export default router;