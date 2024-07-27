import { Router } from 'express';
import {getRequestorNames ,getProductManagerEmails,addProductManagerController} from '../controllers/productManagerController';
const router = Router();
router.get('/requestor-names', getRequestorNames);

router.get('/requestor-email',getProductManagerEmails)
router.post('/addProductManager', addProductManagerController);
export default router;