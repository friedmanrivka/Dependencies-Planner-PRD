import { Router } from 'express';
import {CreateDetailsRequest} from '../controllers/newRequestController';
const router = Router();
router.post('/requestor-Details', CreateDetailsRequest);


export default router;