import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api', // Ajustado para a URL correta
});


export default api;
