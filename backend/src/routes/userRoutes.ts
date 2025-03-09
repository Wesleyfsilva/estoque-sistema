import express, { Router } from 'express';
import { registerUser, loginUser } from '../controllers/usersControllers';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
