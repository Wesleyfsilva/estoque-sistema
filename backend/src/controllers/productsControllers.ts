import { Request, Response } from "express";
import pool from "../config/db";
import { RowDataPacket } from "mysql2";

// Interface do Produto
interface Product extends RowDataPacket {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string | null;
}

// ** Listar todos os produtos **
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const [products] = await pool.query<Product[]>("SELECT * FROM products");
    res.status(200).json(products);
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
    res.status(500).json({ error: "Erro ao carregar produtos." });
  }
};

// ** Buscar produto por ID **
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const [result] = await pool.query<Product[]>(
      "SELECT * FROM products WHERE id = ? LIMIT 1",
      [id]
    );
    if (result.length === 0) {
      res.status(404).json({ error: "Produto não encontrado." });
      return;
    }
    res.status(200).json(result[0]);
  } catch (error) {
    console.error(`Erro ao buscar produto com ID ${id}:`, error);
    res.status(500).json({ error: "Erro ao buscar produto." });
  }
};

// ** Adicionar novo produto **
export const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, stock } = req.body;

    if (!name || !description || typeof price !== "number" || typeof stock !== "number") {
      res.status(400).json({ error: "Todos os campos obrigatórios devem ser preenchidos corretamente." });
      return;
    }

    const [result] = await pool.query(
      "INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)",
      [name, description, price, stock]
    );

    res.status(201).json({
      message: "Produto cadastrado com sucesso!",
      productId: (result as any).insertId,
    });
  } catch (error) {
    console.error("Erro ao cadastrar produto:", error);
    res.status(500).json({ error: "Erro ao cadastrar produto." });
  }
};

// ** Atualizar produto **
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // ID do produto a ser atualizado
    const { name, description, price, stock } = req.body;
  
    // Buscar o token do cabeçalho Authorization
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      res.status(401).json({ error: "Token não fornecido." });
      return;
    }
  
    const token = authHeader.split(" ")[1]; // Divide "Bearer TOKEN" para capturar o token
    console.log("Token recebido:", token);
  
    // Validação dos campos obrigatórios
    if (!name || !description || typeof price !== "number" || typeof stock !== "number") {
      res.status(400).json({ error: "Todos os campos obrigatórios devem ser preenchidos corretamente." });
      return;
    }
  
    try {
      const [result]: any = await pool.query(
        "UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?",
        [name, description, price, stock, id]
      );
  
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Produto não encontrado." });
        return;
      }
  
      res.status(200).json({ message: "Produto atualizado com sucesso!" });
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      res.status(500).json({ error: "Erro ao atualizar produto." });
    }
  };
  

// ** Excluir produto **
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const [result]: any = await pool.query("DELETE FROM products WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Produto não encontrado." });
      return;
    }

    res.status(200).json({ message: "Produto excluído com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    res.status(500).json({ error: "Erro ao excluir produto." });
  }
};
