import { Router } from 'express';
import { createUser } from './controllers/user';
import { createContentCategory } from './controllers/contentCategory'

const router = Router();

router.post('/user', createUser);
router.post('/category', createContentCategory )

export default router;
