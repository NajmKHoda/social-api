import { Router } from 'express';
import { handleRegistration, handleUserDeletion, handleUserPostsRetrieval, handleUserRetrieval } from './handlers.js';

const router = Router();

router.post('/', handleRegistration);
router.get('/:id', handleUserRetrieval);
router.delete('/:id', handleUserDeletion);
router.get('/:id/posts', handleUserPostsRetrieval);

export default router;