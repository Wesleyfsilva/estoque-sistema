import express from 'express';
import { registerUser, loginUser } from '../controllers/usersControllers';

const router = express.Router();

// Rota para registro de usuários
router.post('/register', registerUser);

// Rota para login de usuários
router.post('/login', loginUser);

export default router;
