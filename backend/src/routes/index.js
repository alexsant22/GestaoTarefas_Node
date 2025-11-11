import { Router } from "express";
import tarefasRoutes from "./tarefasRoutes.js";

const router = Router();

// Rota padrão
router.get("/", (req, res) => {
  res.json({
    message: "🌱 API EcoTasks - Gestão de Tarefas Sustentáveis",
    version: "1.0.0",
    endpoints: {
      tarefas: "/api/tarefas",
    },
  });
});

// Rotas da API
router.use("/api/tarefas", tarefasRoutes);

export default router;
