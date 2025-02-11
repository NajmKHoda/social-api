import { Router } from 'express';
import { handleFlagCreation, handleFlagsRetrieval, handlePostCreation, handlePostDeletion, handlePostRetrieval } from './handlers.js';
import { getSession } from '../../middleware/getSession.js';

const router = Router();

router.get('/:id', handlePostRetrieval);

router.use(getSession);
router.post('/', handlePostCreation);
router.delete('/:id', handlePostDeletion);
router.get('/:id/flag', handleFlagsRetrieval);
router.post('/:id/flag', handleFlagCreation);

export default router;