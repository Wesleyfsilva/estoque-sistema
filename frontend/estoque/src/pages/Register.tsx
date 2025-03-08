import React, { useState } from 'react';
import api from '../services/api';
import { AxiosError } from 'axios';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async () => {
        setError(''); // Reseta o erro antes de cada tentativa de registro
        try {
            console.log('Enviando dados para registro:', { name, email, password });
            const response = await api.post('/users/register', { name, email, password });

            // Exibe a mensagem de sucesso
            alert(response.data.message);
        } catch (error) {
            if ((error as AxiosError).response) {
                console.error('Erro ao registrar:', (error as AxiosError).response);
                setError((error as AxiosError).response?.data?.error || 'Erro ao registrar usuário');
            } else {
                console.error('Erro inesperado:', error);
                setError('Erro inesperado ao registrar usuário.');
            }
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h1>Registrar</h1>
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button
                onClick={handleRegister}
                style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
                Registrar
            </button>
        </div>
    );
};

export default Register;
