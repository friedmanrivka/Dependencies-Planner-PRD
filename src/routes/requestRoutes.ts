import { Router } from 'express'
import { getAllRequst , getAllfilterRequests,updateFinalDecision} from '../controllers/requestController';

const router = Router();
router.get('/descriptions', getAllRequst);
router.get('/filterRequests', getAllfilterRequests);
router.get('/updateFinalDecision/:id', updateFinalDecision);
// router.get('/title',getAllTitles);
 router.get('/comments');


export default router;

