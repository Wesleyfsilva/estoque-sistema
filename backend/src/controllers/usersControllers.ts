import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db';

// Registro de usuário
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;

    try {
        // Verifica se o email já está registrado
        const [existingUsers] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if ((existingUsers as any[]).length > 0) {
            res.status(400).json({ error: 'Email já está em uso' });
            return;
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insere o usuário no banco de dados
        await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [
            name,
            email,
            hashedPassword,
        ]);

        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
};

// Login de usuário
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        // Verifica se o usuário existe no banco de dados
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = (users as any[])[0]; // Extrai o primeiro usuário encontrado

        if (!user) {
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }

        // Compara a senha fornecida com a senha armazenada no banco
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ error: 'Senha incorreta' });
            return;
        }

        // Gera um token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};
