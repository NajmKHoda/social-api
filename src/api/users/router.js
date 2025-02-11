import { Router } from 'express';
import { handleLogin, handleRegistration, handleUserPostsRetrieval, handleUserRetrieval } from './handlers.js';

const router = Router();

router.get('/login', handleLogin);
router.post('/register', handleRegistration);
router.get('/:id', handleUserRetrieval);
router.get('/:id/posts', handleUserPostsRetrieval);

export default router;