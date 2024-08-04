import { Router } from 'express';
import {getRequestorNames ,getProductManagerEmails,addProductManagerController,deleteProductManagerByEmail,getAllProductManagers ,updateProductManagerName,addAdmin} from '../controllers/productManagerController';
const router = Router();
router.get('/requestor-names', getRequestorNames);
router.get('/requestor-email',getProductManagerEmails)
router.post('/addProductManager', addProductManagerController);
router.delete('/delete-product-manager/:email', deleteProductManagerByEmail);
router.get('/product-managers', getAllProductManagers);
router.put('/update-product-manager-name/:email', updateProductManagerName);
router.post('/add-admin/:email', addAdmin);
export default router;