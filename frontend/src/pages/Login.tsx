import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:3001/api/users/login", { email, password });
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.name); // Salva o nome do usuário
            alert(`Bem-vindo, ${data.name}!`);
            navigate("/products");
        } catch (error) {
            alert("Erro ao fazer login. Verifique suas credenciais.");
        }
    };

    return (
        <div className="login-container">
            <h1 className="site-title">Gerenciador de Produtos</h1>
            <form className="login-form" onSubmit={handleLogin}>
                <h2 className="login-title">Login</h2>
                <input
                    className="login-input"
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="login-input"
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login-button" type="submit">Entrar</button>
            </form>
            <div className="register-redirect">
                Não tem uma conta? <a href="/register">Registre-se</a>
            </div>
        </div>
    );
};

export default Login;
