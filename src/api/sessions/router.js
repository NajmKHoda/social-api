import { Router } from 'express';
import { handleLogin, handleLogout } from './handlers.js';
import { getSession } from '../../middleware/getSession.js';

const router = Router();

router.get('/', handleLogin);

router.use(getSession);
router.delete('/', handleLogout);

export default router;