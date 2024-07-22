import { Router } from 'express'



import { updateDescription,getAllRequest,updateFinalDecision ,updateRequestTitle,updateRequestComment,updateRequestJira,updateIdDrag} from '../controllers/requestController';



const router = Router();
router.get('/requestor-Details', getAllRequest);
router.put('/updateFinalDecision/:id', updateFinalDecision);
// router.put('/updateIdDrag/:id/:id', updateIdDrag);
// router.get('/filterRequests', getAllfilterRequests);
// router.get('/updateFinalDecision/:id', updateFinalDecision);
// router.get('/title',getAllTitles);
 router.get('/comments');

 router.put('/update-title', updateRequestTitle);
 router.put('/update-description', updateDescription);
 router.put('/update-comment', updateRequestComment); 
 router.put('/update-jira', updateRequestJira); 
//  router.put('/update-product-manager', updateRequestProductManager);

export default router;

