
import { Router } from 'express';
import {checkUserDetails} from '../controllers/authenticationController';
import {authenticateJWT} from '../middlewares/authenticationMiddlware'
const router = Router();
router.get('/admin-action', authenticateJWT, (req, res) => {
    res.status(200).json({ isAdmin: true });
});

console.log('enter the authorization route')
router.post('/check-email', checkUserDetails);


export default router;


// import {authenticateJWT} from '../middlewares/authenticationMiddlware'