import { Router } from 'express'

import { updateDescription, getAllRequest, updateFinalDecision, updateRequestTitle, updateRequestComment, updateRequestJira, updateRequestProductManager, updateRequestorGroup, updatePriority,updateAffectedGroup,swapIdDrag,updatePlans,addRequestPeriod,getDateRange } from '../controllers/requestController';

const router = Router();
router.get('/requestor-Details', getAllRequest);
router.put('/updateFinalDecision/:id', updateFinalDecision);
router.get('/comments');
router.put('/update-title/:id', updateRequestTitle);
router.put('/update-description/:id', updateDescription);
router.put('/update-comment', updateRequestComment);
router.put('/update-jira', updateRequestJira);
router.put('/update-product-manager', updateRequestProductManager);
router.put('/update-requestor-group', updateRequestorGroup);
router.put('/update-priority', updatePriority);
router.put('/update-affected-groups-status', updateAffectedGroup);
router.put('/update-swapIdDrag/:id1/:id2', swapIdDrag);
router.put('/update-planned',updatePlans);
router.post('/addRequestPeriod', addRequestPeriod);
router.get('/getDateRange', getDateRange);



// router.put('/update-affected-groups', updateAffectedGroups);
export default router;





