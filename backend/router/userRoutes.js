import {Router} from 'express';
import {getUser} from '../controllers/userController.js';

const router = Router();

/**get Routes */
router.get('/user/:id', getUser);

export default router;