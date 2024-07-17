import { Router } from 'express'
import { getAllRequst } from '../controllers/requestController';

const router = Router();
router.get('/requestor-Details', getAllRequst);
// router.get('/filterRequests', getAllfilterRequests);
// router.get('/updateFinalDecision/:id', updateFinalDecision);
// router.get('/title',getAllTitles);
 router.get('/comments');


export default router;

