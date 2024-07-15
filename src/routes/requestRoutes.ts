import { Router } from 'express'
<<<<<<< HEAD
import { getAllRequst } from '../controllers/requestController';

const router = Router();
router.get('/descriptions', getAllRequst);
=======
import { getAllRequst , getAllfilterRequests} from '../controllers/requestController';

const router = Router();
router.get('/descriptions', getAllRequst);
router.get('/filterRequests', getAllfilterRequests);
>>>>>>> origin/main
// router.get('/title',getAllTitles);
 router.get('/comments');


export default router;

