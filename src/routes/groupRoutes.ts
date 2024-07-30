
import { Router } from 'express';
import {getRequestorGroup ,addGroup,deleteGroupByName,getAllGroups} from '../controllers/groupController';
const router = Router();
router.get('/requestor-Group', getRequestorGroup);
router.get('/group', getAllGroups);
router.post('/add-group', addGroup);
router.delete('/delete-group', deleteGroupByName);

export default router;