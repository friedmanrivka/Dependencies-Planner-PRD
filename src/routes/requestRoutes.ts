import { Router } from 'express'
import { getAllDescriptions } from '../controllers/requestController';

const router = Router();
router.get('/descriptions', getAllDescriptions);
// router.get('/title',getAllTitles);
 router.get('/comments');


export default router;

