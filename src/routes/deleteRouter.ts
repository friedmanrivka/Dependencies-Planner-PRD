import { Router } from 'express';
import { validateDeleteRequest } from '../middlewares/RequestValadation';
import { deleteRequest } from '../controllers/deleteController';

const router = Router();
router.delete('/product-manager/:id', validateDeleteRequest, deleteRequest);
export default router;
