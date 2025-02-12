import { Router } from 'express';
import { handleRegistration, handleUserDeletion, handleUserPostsRetrieval, handleUserRetrieval } from './handlers.js';
import { getSession } from '../../middleware/getSession.js';

const router = Router();

router.post('/', handleRegistration);
router.get('/:id', handleUserRetrieval);
router.get('/:id/posts', handleUserPostsRetrieval);

router.use(getSession);
router.delete('/:id', handleUserDeletion);

export default router;