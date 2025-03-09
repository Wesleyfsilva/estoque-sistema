import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Define a porta 3000 para o frontend
    proxy: {
      '/api': 'http://localhost:3001', // Redireciona chamadas para o backend
    },
  },
});
