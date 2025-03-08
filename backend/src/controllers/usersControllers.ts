import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db'; // Ajuste este caminho para o seu arquivo de configuração do banco

// Registro de Usuário
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;

    console.log('Dados recebidos na rota /register:', req.body);

    try {
        if (!name || !email || !password) {
            console.log('Erro: Campos obrigatórios ausentes.');
            res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
            return;
        }

        // Verificar se o email já está registrado
        const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if ((existingUser as any).length > 0) {
            console.log('Erro: Email já em uso.');
            res.status(400).json({ error: 'Este email já está em uso.' });
            return;
        }

        // Criptografar a senha
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Senha criptografada:', hashedPassword);

        // Inserir o usuário no banco de dados
        await pool.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        console.log('Usuário registrado com sucesso no banco.');
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ error: 'Erro ao registrar usuário.' });
    }
};

// Login de Usuário
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    console.log('Dados recebidos na rota /login:', req.body);

    try {
        // Verificar se o email existe
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = (rows as any)[0];

        if (!user) {
            console.log('Erro: Usuário não encontrado.');
            res.status(404).json({ error: 'Usuário não encontrado.' });
            return;
        }

        // Verificar se a senha está correta
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Erro: Senha incorreta.');
            res.status(401).json({ error: 'Senha incorreta.' });
            return;
        }

        // Gerar token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        console.log('Token gerado:', token);

        res.json({ token });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login.' });
    }
};
