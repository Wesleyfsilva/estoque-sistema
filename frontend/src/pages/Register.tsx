import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/users/register", { name, email, password });
      alert("Usuário registrado com sucesso!");
      navigate("/");
    } catch (error) {
      alert("Erro ao registrar usuário.");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Registrar</h2>
      <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default Register;
