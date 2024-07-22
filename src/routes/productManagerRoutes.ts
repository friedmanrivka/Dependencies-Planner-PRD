import { Router } from 'express';
import {getRequestorNames ,getProductManagerEmails} from '../controllers/productManagerController';
const router = Router();
router.get('/requestor-names', getRequestorNames);

router.get('/requestor-email',getProductManagerEmails)
export default router;