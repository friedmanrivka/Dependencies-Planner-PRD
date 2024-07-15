import { Router } from 'express'
import { getAllRequst , getAllfilterRequests} from '../controllers/requestController';

const router = Router();
router.get('/descriptions', getAllRequst);
router.get('/filterRequests', getAllfilterRequests);
// router.get('/title',getAllTitles);
 router.get('/comments');


export default router;

