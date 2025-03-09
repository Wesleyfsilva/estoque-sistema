import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // Certifique-se de que api.ts está configurado com baseURL correta

// Interface para os produtos
interface Product {
  id: number;
  name: string;
  description: string;
  price: string | number; // Pode ser string ou número
  stock: number;
  image?: string; // Imagem é opcional
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Você precisa fazer login.");
        navigate("/login");
        return;
      }

      try {
        console.log("Buscando produtos com o token:", token);
        const { data } = await api.get<Product[]>("/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Produtos recebidos:", data);
        setProducts(data); // Atualiza os produtos recebidos
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        alert("Erro ao carregar produtos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts(); // Chamada da API ao carregar o componente
  }, [navigate]);

  // Função para excluir o produto
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este produto?");
    if (!confirmDelete) return; // Cancela a exclusão se o usuário clicar em "Cancelar"

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Produto excluído com sucesso!");
      // Atualiza a lista de produtos sem o excluído
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      alert("Não foi possível excluir o produto.");
    }
  };

  // Exibe uma mensagem enquanto os produtos estão sendo carregados
  if (loading) {
    return <p>Carregando produtos...</p>;
  }

  // Exibe mensagem caso nenhum produto seja encontrado
  if (products.length === 0) {
    return <p>Nenhum produto encontrado.</p>;
  }

  return (
    <div className="products-page">
      <header className="products-header">
        <h1>Gerenciador de Produtos</h1>
        <button
          className="add-product-button"
          onClick={() => navigate("/add-product")}
        >
          Adicionar Produto
        </button>
      </header>
      <table className="products-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>
                {isNaN(Number(product.price))
                  ? "Preço inválido"
                  : `R$${Number(product.price).toFixed(2)}`}
              </td>
              <td>{product.stock}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => navigate(`/edit-product/${product.id}`)}
                >
                  Editar
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(product.id)} // Chama a função de exclusão
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
