import express from 'express';
import multer from 'multer';
import {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock
} from '../controllers/productsControllers';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Rotas de Produtos
router.get('/', authMiddleware, getProducts); // Listar produtos
router.post('/', authMiddleware, upload.single('image'), addProduct); // Adicionar produto
router.put('/:id', authMiddleware, upload.single('image'), updateProduct); // Atualizar produto
router.delete('/:id', authMiddleware, deleteProduct); // Remover produto
router.patch('/:id/stock', authMiddleware, updateStock); // Atualizar estoque

export default router;
