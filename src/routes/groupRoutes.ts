
import { Router } from 'express';
import {getRequestorGroup ,addGroup,deleteGroup,getAllGroups} from '../controllers/groupController';
const router = Router();
router.get('/requestor-Group', getRequestorGroup);
router.get('/group', getAllGroups);
router.post('/add-group', addGroup);
router.delete('/delete-group/:id', deleteGroup);

export default router;