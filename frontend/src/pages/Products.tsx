import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string | number;
  stock: number;
  image?: string;
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
        const { data } = await api.get<Product[]>("/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(data);
      } catch (error) {
        alert("Erro ao carregar produtos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      alert("Erro ao excluir produto.");
    }
  };

  if (loading) return <p>Carregando produtos...</p>;

  if (products.length === 0) {
    return (
      <div className="products-page">
        <div className="empty-products">
          <p>Nenhum produto encontrado.</p>
          <button
            className="add-product-button"
            onClick={() => navigate("/add-product")}
          >
            Adicionar Produto
          </button>
        </div>
      </div>
    );
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
            <th>Estoque</th>
            <th>Imagem</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>R${Number(product.price).toFixed(2)}</td>
              <td>{product.stock}</td>
              <td>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                ) : (
                  "Sem imagem"
                )}
              </td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => navigate(`/edit-product/${product.id}`)}
                >
                  Editar
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(product.id)}
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
