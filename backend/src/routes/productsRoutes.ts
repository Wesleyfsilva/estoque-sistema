import express from 'express';
import multer from 'multer';
import {
    getProducts,
    addProduct,
} from '../controllers/productsControllers';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/'); // Diretório onde as imagens serão salvas
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Gera nomes únicos para cada arquivo
    },
});
const upload = multer({ storage });

// Rotas de produtos
router.get('/', authenticateToken, getProducts);
router.post('/', authenticateToken, upload.single('image'), addProduct);

export default router;
