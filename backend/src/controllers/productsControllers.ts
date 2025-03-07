import { Request, Response } from 'express';
import pool from '../config/db';

export const getProducts = async (_req: Request, res: Response) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
};

export const addProduct = async (req: Request, res: Response) => {
    const { name, description, price, quantity } = req.body;
    try {
        await pool.query(
            'INSERT INTO products (name, description, price, quantity) VALUES (?, ?, ?, ?)',
            [name, description, price, quantity]
        );
        res.status(201).json({ message: 'Produto adicionado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar produto' });
    }
};
