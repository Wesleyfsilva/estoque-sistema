import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path"; // Adicione esta linha para importar o módulo 'path'
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productsRoutes";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "../uploads"))); // Corrige erro com 'path'

// Rotas
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// Rota inicial
app.get("/", (req, res) => {
  res.send("API funcionando!");
});

// Inicialização do servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
