import { Request, Response } from 'express';
import pool from '../config/db';
import sharp from 'sharp';

// Extender o tipo Request para lidar com upload de imagens usando Multer
interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

// Listar Produtos
export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const [rows] = await pool.query('SELECT * FROM products');
        res.json(rows);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ error: 'Erro ao buscar produtos.' });
    }
};

// Adicionar Produto
export const addProduct = async (req: MulterRequest, res: Response): Promise<void> => {
    const { name, description, price, stock } = req.body;

    try {
        if (!name || !price || typeof stock === 'undefined') {
            res.status(400).json({ error: 'Nome, preço e estoque são obrigatórios.' });
            return;
        }

        let imageBuffer: Buffer | null = null;

        if (req.file) {
            // Redimensionar e comprimir a imagem
            imageBuffer = await sharp(req.file.buffer)
                .resize(800) // Redimensiona para largura máxima de 800px
                .jpeg({ quality: 80 }) // Converte para JPEG com qualidade de 80%
                .toBuffer();
        }

        await pool.query(
            'INSERT INTO products (name, description, image, price, stock) VALUES (?, ?, ?, ?, ?)',
            [name, description, imageBuffer, price, stock]
        );

        res.status(201).json({ message: 'Produto adicionado com sucesso!' });
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        res.status(500).json({ error: 'Erro ao adicionar produto.' });
    }
};


// Atualizar Produto
export const updateProduct = async (req: MulterRequest, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    const image = req.file?.buffer;

    try {
        if (!name || !price || typeof stock === 'undefined') {
            res.status(400).json({ error: 'Nome, preço e estoque são obrigatórios.' });
            return;
        }

        await pool.query(
            'UPDATE products SET name = ?, description = ?, image = ?, price = ?, stock = ? WHERE id = ?',
            [name, description, image, price, stock, id]
        );

        res.status(200).json({ message: 'Produto atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).json({ error: 'Erro ao atualizar produto.' });
    }
};

// Remover Produto
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM products WHERE id = ?', [id]);
        res.json({ message: 'Produto removido com sucesso!' });
    } catch (error) {
        console.error('Erro ao remover produto:', error);
        res.status(500).json({ error: 'Erro ao remover produto.' });
    }
};

// Atualizar Estoque
export const updateStock = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { stockChange } = req.body;

    try {
        await pool.query(
            'UPDATE products SET stock = stock + ? WHERE id = ?',
            [stockChange, id]
        );

        res.json({ message: 'Estoque atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar estoque:', error);
        res.status(500).json({ error: 'Erro ao atualizar o estoque.' });
    }
};
