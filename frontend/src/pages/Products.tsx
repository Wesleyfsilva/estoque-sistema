import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define a interface para o tipo Product
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string; // Opcional caso nem todos os produtos tenham imagem
}

const Products = () => {
  // Define o estado com um tipo explícito Product[]
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await axios.get<Product[]>("http://localhost:3001/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(data); // Atualiza o estado com os produtos retornados
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts(); // Chama a função para buscar os produtos
  }, []);

  return (
    <div>
      <h2>Produtos</h2>
      <button onClick={() => navigate("/add-product")}>Adicionar Produto</button>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name}
            <button onClick={() => navigate(`/edit-product/${product.id}`)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
