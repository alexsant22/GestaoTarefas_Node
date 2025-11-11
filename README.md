# 🌱 EcoTasks - Sistema de Gestão de Tarefas Sustentáveis

![EcoTasks](https://img.shields.io/badge/EcoTasks-Sustainable%20Tasks-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

Um aplicativo web completo para gerenciamento de tarefas relacionadas à sustentabilidade e meio ambiente. Desenvolvido com React 19 no frontend e Node.js + MySQL no backend.

## 📋 Sobre o Projeto

O EcoTasks ajuda usuários a organizarem tarefas diárias sustentáveis, como reciclar, economizar água, plantar árvores, reduzir energia, entre outras atividades ecologicamente corretas. O projeto explora conceitos modernos de desenvolvimento web full-stack.

### 🎯 Objetivos

- Promover hábitos sustentáveis no dia a dia
- Oferecer uma ferramenta intuitiva para gestão de tarefas
- Demonstrar desenvolvimento full-stack com tecnologias modernas
- Conscientizar sobre a importância de pequenas ações para o planeta

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 19.2.0** - Biblioteca JavaScript para interfaces
- **Vite 7.2.2** - Build tool e dev server
- **CSS3** - Estilização moderna e responsiva
- **ESLint** - Linting e qualidade de código

### Backend
- **Node.js** - Runtime JavaScript
- **Express 4.18.2** - Framework web
- **MySQL2** - Driver MySQL
- **CORS** - Middleware para cross-origin requests

### Banco de Dados
- **MySQL** - Sistema de gerenciamento de banco relacional

### Ferramentas
- **Postman** - Teste de APIs
- **Git** - Controle de versão
- **Nodemon** - Reinício automático do servidor

## 📁 Estrutura do Projeto

```
GestaoTarefas_Node/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── config.js
│   │   │   ├── database.js
│   │   │   └── initDatabase.js
│   │   ├── controllers/
│   │   │   └── tarefasController.js
│   │   ├── middleware/
│   │   │   └── errorHandler.js
│   │   ├── models/
│   │   │   └── Tarefa.js
│   │   ├── routes/
│   │   │   ├── index.js
│   │   │   └── tarefasRoutes.js
│   │   └── server.js
│   ├── package.json
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── TaskItem.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
└── README.md
```

## ⚙️ Instalação e Configuração

### Pré-requisitos

- Node.js 18+
- MySQL 5.7+
- npm ou yarn

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/GestaoTarefas_Node.git
cd GestaoTarefas_Node
```

### 2. Configuração do Backend

```bash
# Navegue para a pasta do backend
cd backend

# Instale as dependências
npm install

# Configure o banco de dados
# Edite o arquivo src/config/config.js com suas credenciais MySQL
```

**Arquivo de configuração do banco (`backend/src/config/config.js`):**
```javascript
const config = {
  database: {
    host: 'localhost',
    user: 'root',
    password: 'sua_senha', // Altere para sua senha do MySQL
    database: 'eco_tasks'
  }
};
```

### 3. Configuração do Frontend

```bash
# Navegue para a pasta do frontend (em outro terminal)
cd frontend

# Instale as dependências
npm install
```

## 🎮 Como Executar

### Desenvolvimento

**Backend:**
```bash
cd backend
npm run dev
```
O servidor estará disponível em: `http://localhost:3000`

**Frontend:**
```bash
cd frontend
npm run dev
```
O aplicativo estará disponível em: `http://localhost:5173`

### Produção

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 📊 Funcionalidades

### ✅ Principais Funcionalidades

- **Cadastro de Tarefas** - Adicione novas tarefas sustentáveis
- **Listagem de Tarefas** - Visualize todas as tarefas organizadas
- **Marcar como Concluída** - Acompanhe seu progresso
- **Exclusão de Tarefas** - Remova tarefas não desejadas
- **Filtros por Categoria** - Organize por tipo de atividade
- **Estatísticas** - Veja seu progresso em tempo real
- **Interface Responsiva** - Funciona em desktop e mobile

### 🗂️ Categorias de Tarefas

- ♻️ **Reciclagem** - Tarefas relacionadas à separação e reciclagem de materiais
- 💧 **Economia de Água** - Ações para reduzir o consumo de água
- ⚡ **Economia de Energia** - Práticas para economizar energia elétrica
- 🚲 **Transporte Sustentável** - Mobilidade com menor impacto ambiental
- 🍎 **Alimentação Sustentável** - Hábitos alimentares mais conscientes
- 🛍️ **Consumo Consciente** - Compras e consumo responsável
- 🌳 **Contato com a Natureza** - Atividades ao ar livre e preservação
- 📚 **Educação Ambiental** - Aprendizado e conscientização

## 🔌 API Endpoints

### Tarefas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/tarefas` | Lista todas as tarefas |
| `GET` | `/api/tarefas/:id` | Busca tarefa por ID |
| `POST` | `/api/tarefas` | Cria nova tarefa |
| `PUT` | `/api/tarefas/:id` | Atualiza tarefa |
| `DELETE` | `/api/tarefas/:id` | Remove tarefa |
| `GET` | `/api/tarefas/categoria/:categoria` | Filtra por categoria |
| `GET` | `/api/tarefas/status/:status` | Filtra por status |

### Exemplo de Requisições

**Criar Tarefa:**
```bash
POST /api/tarefas
Content-Type: application/json

{
  "titulo": "Separar lixo reciclável",
  "categoria": "reciclagem"
}
```

**Atualizar Status:**
```bash
PUT /api/tarefas/1
Content-Type: application/json

{
  "status": true
}
```

## 🗃️ Estrutura do Banco de Dados

**Tabela: `tarefas`**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | INT AUTO_INCREMENT | Identificador único |
| `titulo` | VARCHAR(100) | Título da tarefa |
| `categoria` | VARCHAR(50) | Categoria da tarefa |
| `status` | BOOLEAN | Status de conclusão (false=pendente, true=concluída) |
| `created_at` | TIMESTAMP | Data de criação |
| `updated_at` | TIMESTAMP | Data da última atualização |

## 🎨 Interface do Usuário

### Características da UI
- **Design Moderno** - Interface limpa e intuitiva
- **Responsiva** - Adaptável a diferentes tamanhos de tela
- **Feedback Visual** - Animações e estados de loading
- **Acessível** - Navegação intuitiva e clara
- **Tema Sustentável** - Cores e elementos que remetem à natureza

### Componentes Principais
- **TaskForm** - Formulário para adicionar novas tarefas
- **TaskList** - Lista organizada de tarefas
- **TaskItem** - Item individual da lista
- **Estatísticas** - Painel com métricas de progresso


## 👥 Autores

- **Alexandre Santos** - *Desenvolvimento Full-Stack* - [SeuGitHub](https://github.com/alexsant22)

---

**🌍 Juntos por um mundo mais sustentável!**

*"Pequenas ações realizadas por muitas pessoas podem transformar o mundo."*
