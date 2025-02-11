import { Router } from 'express';
import { handleLogin, handleRegistration } from './handlers.js';

const router = Router();
router.get('/login', handleLogin);
router.post('/register', handleRegistration);

export default router;