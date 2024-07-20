
import { Router } from 'express';
import {checkEmail} from '../controllers/authenticationController'
const router = Router();
router.post('/check-email', checkEmail);


export default router;