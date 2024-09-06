import { Router } from 'express';
import { createUser } from './controllers/user';
import { createContentCategory } from './controllers/contentCategory'
import { createContentTopic } from './controllers/contentTopic'
const router = Router();

router.post('/user', createUser);
router.post('/category', createContentCategory )
router.post('/topic', createContentTopic)

export default router;
