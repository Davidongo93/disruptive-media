import { Router } from 'express';
import { createUser,getUsers } from './controllers/user';
import { createContentCategory, getContentCategories } from './controllers/contentCategory';
import { createContentTopic } from './controllers/contentTopic';
import { createContent, getContentsController } from './controllers/content';
import loginUserController from './controllers/authController';
import authMiddleware from './middleware/authMiddleware';

const router = Router();
router.post('/login', loginUserController);
router.post('/user', createUser);
router.get('/users', authMiddleware, getUsers);
//TODO admin validate
router.post('/category',authMiddleware, createContentCategory );
router.get('/categories', getContentCategories);
router.post('/topic', authMiddleware, createContentTopic);
router.post('/posts', authMiddleware, createContent)
router.get('/posts', authMiddleware, getContentsController)

export default router;
