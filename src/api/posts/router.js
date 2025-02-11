import { Router } from 'express';
import { handleFlagCreation, handleFlagsRetrieval, handlePostCreation, handlePostDeletion, handlePostRetrieval } from './handlers.js';
import { getSession } from '../../middleware/getSession.js';

const router = Router();

router.get('/', handlePostRetrieval);

router.use(getSession);
router.post('/', handlePostCreation);
router.delete('/', handlePostDeletion);
router.get('/flag', handleFlagsRetrieval);
router.post('/flag', handleFlagCreation);

export default router;