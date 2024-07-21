import { Router } from 'express'
import { getAllRequst,updateFinalDecision,updateIdDrag } from '../controllers/requestController';

const router = Router();
router.get('/requestor-Details', getAllRequst);
router.put('/updateFinalDecision/:id', updateFinalDecision);
router.put('/updateIdDrag/:id/:id', updateIdDrag);
// router.get('/filterRequests', getAllfilterRequests);
// router.get('/updateFinalDecision/:id', updateFinalDecision);
// router.get('/title',getAllTitles);
 router.get('/comments');


export default router;

