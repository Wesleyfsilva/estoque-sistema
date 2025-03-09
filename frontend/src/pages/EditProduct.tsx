import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const EditProduct = () => {
  const { id } = useParams(); // Obtém o ID do produto da URL
  const navigate = useNavigate();

  // Estados para o formulário
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Busca os dados do produto ao carregar a página
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token"); // Certifique-se de que o token está configurado
        const { data } = await api.get(`/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        setName(data.name || "");
        setDescription(data.description || "");
        setPrice(data.price || "");
        setStock(data.stock || "");
        setExistingImage(data.image || null);
        setLoading(false); // Finaliza o carregamento
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
        alert("Erro ao carregar produto."); // Mensagem ao usuário
        navigate("/products");
      }
    };
  
    fetchProduct();
  }, [id, navigate]);
  

  // Lógica para atualizar o produto
  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    if (image) formData.append("image", image);

    try {
      const token = localStorage.getItem("token");
      await api.put(`/products/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Produto atualizado com sucesso!");
      navigate("/products"); // Redireciona para a página de produtos
    } catch (error) {
      alert("Erro ao atualizar produto.");
    }
  };

  if (loading) {
    return <p>Carregando informações do produto...</p>;
  }

  return (
    <div className="edit-page">
      <form onSubmit={handleEdit}>
        <h2>Editar Produto</h2>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Estoque"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        {existingImage && (
          <div>
            <p>Imagem atual:</p>
            <img
              src={existingImage}
              alt="Produto"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          </div>
        )}
        <input
          type="file"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
        />
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default EditProduct;
