import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    if (image) formData.append("image", image);

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3001/api/products", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Produto adicionado com sucesso!");
      navigate("/products");
    } catch (error) {
      alert("Erro ao adicionar produto.");
    }
  };

  return (
    <form onSubmit={handleAddProduct}>
      <h2>Adicionar Produto</h2>
      <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
      <textarea placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="number" placeholder="Preço" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input type="number" placeholder="Estoque" value={stock} onChange={(e) => setStock(e.target.value)} />
      <input type="file" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} />
      <button type="submit">Salvar</button>
    </form>
  );
};

export default AddProduct;
