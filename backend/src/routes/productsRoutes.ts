import { Router } from 'express';
import { getProducts, addProduct } from '../controllers/productsController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authMiddleware, getProducts);
router.post('/', authMiddleware, addProduct);

export default router;
