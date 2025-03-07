import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/users.routes';
import productRoutes from './routes/products.routes';

dotenv.config();
const app = express();

app.use(express.json());

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
