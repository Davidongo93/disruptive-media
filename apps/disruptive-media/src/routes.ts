import { Router } from 'express';
import { createUser,getUsers } from './controllers/user';
import { createContentCategory } from './controllers/contentCategory';
import { createContentTopic } from './controllers/contentTopic';
import loginUserController from './controllers/authController';
import authMiddleware from './middleware/authMiddleware';

const router = Router();
router.post('/login', loginUserController);
router.post('/user', createUser);
router.get('/users', authMiddleware, getUsers);
router.post('/category',authMiddleware, createContentCategory )
router.post('/topic',authMiddleware, createContentTopic)

export default router;
