import { Router } from 'express';
import {getRequestorNames ,getProductManagerEmails,addProductManagerController,deleteProductManagerByEmail,getAllProductManagers } from '../controllers/productManagerController';
const router = Router();
router.get('/requestor-names', getRequestorNames);
router.get('/requestor-email',getProductManagerEmails)
router.post('/addProductManager', addProductManagerController);
router.delete('/delete-product-manager', deleteProductManagerByEmail);
router.get('/product-managers', getAllProductManagers);
export default router;