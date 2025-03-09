import { Request, Response } from 'express';
import pool from '../config/db';

// Listar produtos
export const getProducts = async (req: Request, res: Response) => {
    try {
        const [products] = await pool.query('SELECT * FROM products');

        // Formata os produtos para incluir a URL completa da imagem
        const formattedProducts = (products as any[]).map(product => ({
            ...product,
            image: product.image
                ? `http://localhost:3001/uploads/${product.image}`
                : null,
        }));

        res.status(200).json(formattedProducts);
    } catch (error) {
        console.error("Erro ao listar produtos:", error);
        res.status(500).json({ error: 'Erro ao listar produtos.' });
    }
};

// Adicionar produto
export const addProduct = async (req: Request, res: Response) => {
    const { name, description, price, stock } = req.body;
    const image = req.file?.filename || null; // Salva apenas o nome do arquivo

    try {
        if (!name || !description || !price || !stock) {
            res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
            return;
        }

        await pool.query(
            'INSERT INTO products (name, description, price, stock, image) VALUES (?, ?, ?, ?, ?)',
            [name, description, price, stock, image]
        );

        res.status(201).json({ message: 'Produto adicionado com sucesso!' });
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        res.status(500).json({ error: 'Erro ao adicionar produto.' });
    }
};
