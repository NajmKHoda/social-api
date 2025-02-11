import { Router } from 'express';
import { handleLogin, handleRegistration, handleUserDeletion, handleUserPostsRetrieval, handleUserRetrieval } from './handlers.js';

const router = Router();

router.post('/', handleRegistration);
router.get('/login', handleLogin);
router.get('/:id', handleUserRetrieval);
router.delete('/:id', handleUserDeletion);
router.get('/:id/posts', handleUserPostsRetrieval);

export default router;