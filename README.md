# Backend - Sistema de Estoque

Este é o backend do sistema de estoque desenvolvido em **Node.js**, com **Express** e banco de dados **MySQL**.

## 📋 Funcionalidades Implementadas
- Registro de usuários com senhas criptografadas (bcrypt).
- Login de usuários com autenticação por JWT (Json Web Token).
- CRUD de produtos:
  - Cadastro, edição, exclusão e listagem.
- Middleware de autenticação para proteger rotas privadas.
- Suporte ao armazenamento de imagens localmente ou como BLOB no banco.

---

## 🚀 Tecnologias Utilizadas
- **Node.js**
- **Express**
- **MySQL**
- **TypeScript**
- **Bcrypt** (criptografia de senhas)
- **Jsonwebtoken** (autenticação com JWT)
- **Multer** (upload de arquivos, como imagens)

---

## 🔧 Instalação e Configuração

### **1. Pré-requisitos**
- **Node.js** instalado na máquina.
- **MySQL** configurado e rodando.
- Ferramenta para gerenciar dependências, como NPM ou Yarn.

### **2. Configuração**
1. Clone o repositório do backend:
   ```bash
   git clone https://github.com/seu-usuario/backend-estoque.git
   cd backend-estoque

Instale as dependências:

npm install

Configure as variáveis de ambiente no arquivo .env: Crie o arquivo .env na raiz do projeto com as seguintes informações:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua-senha
DB_NAME=estoque
DB_PORT=3306
JWT_SECRET=sua-chave-secreta
Crie o banco de dados e importe o dump:

No terminal, execute o comando:


mysql -u seu_usuario -p nome_do_banco < dump.sql
Inicie o servidor:


npm run dev
📚 Rotas Disponíveis
Rotas de Usuário
POST /api/users/register: Registra um novo usuário.

Body:

json
{
  "name": "Seu Nome",
  "email": "seu-email@email.com",
  "password": "sua-senha"
}
POST /api/users/login: Faz login e retorna o token JWT.

Body:

json
{
  "email": "seu-email@email.com",
  "password": "sua-senha"
}
Rotas de Produtos
GET /api/products: Lista todos os produtos.

GET /api/products/:id: Busca um produto pelo ID.

POST /api/products: Cadastra um novo produto (autenticado).

Headers: Authorization: Bearer <token>

Body:

json
{
  "name": "Produto",
  "description": "Descrição do produto",
  "price": 100.00,
  "stock": 10
}
PUT /api/products/:id: Atualiza um produto pelo ID (autenticado).

Headers: Authorization: Bearer <token>

Body:

json
{
  "name": "Produto Atualizado",
  "description": "Descrição Atualizada",
  "price": 150.00,
  "stock": 5
}
DELETE /api/products/:id: Remove um produto pelo ID (autenticado).

🗂 Estrutura do Projeto
backend/
├── src/
│   ├── controllers/       # Controladores das rotas
│   ├── middlewares/       # Middleware de autenticação
│   ├── models/            # Interfaces e modelos
│   ├── routes/            # Definição das rotas
│   ├── config/            # Configuração do banco de dados
│   └── index.ts           # Ponto de entrada do servidor
├── dump.sql               # Dump do banco de dados
├── package.json           # Dependências do projeto
├── tsconfig.json          # Configuração do TypeScript
└── README.md              # Documentação do projeto
🛠 Como Contribuir
Faça um fork do projeto.

Crie uma branch para suas alterações:

bash
git checkout -b minha-feature
Faça o commit:

bash
git commit -m "Minha nova feature"
Envie suas mudanças:

bash
git push origin minha-feature
Abra um Pull Request.

📝 Licença
Este projeto é distribuído sob a licença MIT.


---

### **README do Frontend**

# Frontend - Sistema de Estoque

Este é o frontend do sistema de estoque, desenvolvido em **ReactJS** com **Vite** para gerenciar produtos e usuários.

## 📋 Funcionalidades Implementadas
- Página de registro e login de usuários.
- Lista de produtos cadastrados.
- CRUD de produtos:
  - Cadastro, edição e exclusão.

---

## 🚀 Tecnologias Utilizadas
- **ReactJS**
- **TypeScript**
- **Vite** (ferramenta de build)
- **React Router** (para navegação)

---

## 🔧 Instalação e Configuração

### **1. Pré-requisitos**
- **Node.js** instalado na máquina.
- Ferramenta para gerenciar dependências, como NPM ou Yarn.

### **2. Configuração**
1. Clone o repositório do frontend:
   
   git clone https://github.com/seu-usuario/frontend-estoque.git
   cd frontend-estoque
Instale as dependências:

npm install
Inicie o servidor de desenvolvimento:

npm run dev
Acesse o frontend no navegador:

http://localhost:5173

📚 Páginas Disponíveis
/: Tela inicial.

/register: Página de registro de novos usuários.

/login: Página de login.

/products: Lista os produtos cadastrados.

/products/new: Cadastra um novo produto.

/products/:id/edit: Edita um produto existente.

🛠 Como Contribuir
Faça um fork do projeto.

Crie uma branch para suas alterações:

git checkout -b minha-feature
Faça o commit:

git commit -m "Minha nova feature"
Envie suas mudanças:

git push origin minha-feature
Abra um Pull Request.

📝 Licença
Este projeto é distribuído sob a licença MIT.


### **Pronto para Subir ao GitHub!**
1. Salve os arquivos `README.md` no diretório correto (backend e frontend).
2. Siga os passos de commit e push pelo terminal que mencionei antes.

Se precisar ajustar ou esclarecer algo, é só chamar! 🚀✨

