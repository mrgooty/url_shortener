import { Router } from 'express';
import * as usersController from '../controllers/userController';

const router = Router();

router.post('/createUser', usersController.createUser);
router.post('/login', usersController.loginUser);

export default router;
