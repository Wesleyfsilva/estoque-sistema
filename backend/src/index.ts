import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productsRoutes';
import cors from 'cors';
import morgan from 'morgan';

console.log('Iniciando o servidor...');

// Configuração de variáveis de ambiente
dotenv.config();

// Inicialização do Express
const app = express();

// Middlewares
app.use(cors()); // Permite comunicação entre frontend e backend
app.use(morgan('dev')); // Logs detalhados de requisições
app.use(express.json()); // Parse de JSON no body das requisições

// Rotas
app.use('/api/users', userRoutes); // Rotas de usuários
app.use('/api/products', productRoutes); // Rotas de produtos

// Rota padrão (teste)
app.get('/', (req, res) => {
    res.send('API funcionando!'); // Mensagem de teste
});

// Inicialização do Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));


app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Necessário para `form-data`
