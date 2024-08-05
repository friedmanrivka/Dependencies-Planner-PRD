
import { Router } from 'express';
import {checkUserDetails} from '../controllers/authenticationController'
const router = Router();
router.post('/check-email', checkUserDetails);


export default router;