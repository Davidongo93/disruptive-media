import { Router } from 'express';
import { createUser } from './controllers/user';

const router = Router();

//define routes
router.post('/user', createUser);

export default router;
