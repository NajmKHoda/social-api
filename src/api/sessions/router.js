import { Router } from 'express';
import { handleLogin, handleLogout } from './handlers';

const router = Router();

router.get('/', handleLogin);
router.delete('/', handleLogout);

export default router;