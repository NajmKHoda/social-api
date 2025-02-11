import { Router } from 'express';
import { handleLogin, handleRegistration, handleUserPostsRetrieval, handleUserRetrieval } from './handlers.js';

const router = Router();

router.post('/', handleRegistration);
router.get('/login', handleLogin);
router.get('/:id', handleUserRetrieval);
router.get('/:id/posts', handleUserPostsRetrieval);

export default router;