import { Router } from 'express'
import { getAllRequst } from '../controllers/requestController';

const router = Router();
router.get('/descriptions', getAllRequst);
// router.get('/title',getAllTitles);
 router.get('/comments');


export default router;

