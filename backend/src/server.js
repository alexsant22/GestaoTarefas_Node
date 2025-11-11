import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";
import "./config/initDatabase.js"; // Importa a inicialização do banco

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Rotas
app.use("/", routes);

// Middleware de erro
app.use(errorHandler);

// Rota não encontrada
app.use("*", (req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// Aguardar um pouco antes de iniciar o servidor para dar tempo do banco inicializar
setTimeout(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor EcoTasks rodando na porta ${PORT}`);
    console.log(`📊 Acesse: http://localhost:${PORT}`);
    console.log(`🌱 API disponível em: http://localhost:${PORT}/api/tarefas`);
  });
}, 1000);
