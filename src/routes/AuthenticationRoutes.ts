
import { Router } from 'express';
import {checkUserDetails} from '../controllers/authenticationController';
import { verifyAdmin } from '../middlewares/authenticationMiddlware';
const router = Router();
router.post('/check-email', checkUserDetails);

router.get('/check-admin', verifyAdmin, (req, res) => {
    res.status(200).json({ message: 'User is admin' });
});

export default router;