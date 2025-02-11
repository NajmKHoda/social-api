import { Router } from 'express';
import { handleLogin, handleRegistration, handleUserPostsRetrieval, handleUserRetrieval } from './handlers.js';

const router = Router();

router.get('/', handleUserRetrieval);
router.get('/login', handleLogin);
router.post('/register', handleRegistration);
router.get('/posts', handleUserPostsRetrieval);

export default router;