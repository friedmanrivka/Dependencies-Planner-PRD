import { Router } from 'express'
import { getAllRequst,updateFinalDecision } from '../controllers/requestController';

const router = Router();
router.get('/requestor-Details', getAllRequst);
router.put('/updateFinalDecision/:id', updateFinalDecision);
// router.get('/filterRequests', getAllfilterRequests);
// router.get('/updateFinalDecision/:id', updateFinalDecision);
// router.get('/title',getAllTitles);
 router.get('/comments');


export default router;

