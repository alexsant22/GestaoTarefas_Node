import { Router } from "express";
import TarefasController from "../controllers/tarefasController.js";

const router = Router();

// GET /tarefas - Buscar todas as tarefas
router.get("/", TarefasController.getAllTarefas);

// GET /tarefas/:id - Buscar tarefa por ID
router.get("/:id", TarefasController.getTarefaById);

// POST /tarefas - Criar nova tarefa
router.post("/", TarefasController.createTarefa);

// PUT /tarefas/:id - Atualizar tarefa
router.put("/:id", TarefasController.updateTarefa);

// DELETE /tarefas/:id - Deletar tarefa
router.delete("/:id", TarefasController.deleteTarefa);

// GET /tarefas/categoria/:categoria - Buscar tarefas por categoria
router.get("/categoria/:categoria", TarefasController.getTarefasByCategoria);

// GET /tarefas/status/:status - Buscar tarefas por status
router.get("/status/:status", TarefasController.getTarefasByStatus);

export default router;
