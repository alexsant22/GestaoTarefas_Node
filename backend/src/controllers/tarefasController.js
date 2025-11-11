import Tarefa from "../models/Tarefa.js";

class TarefasController {
  // GET /tarefas
  static async getAllTarefas(req, res, next) {
    try {
      const tarefas = await Tarefa.findAll();
      res.json(tarefas);
    } catch (error) {
      next(error);
    }
  }

  // GET /tarefas/:id
  static async getTarefaById(req, res, next) {
    try {
      const { id } = req.params;
      const tarefa = await Tarefa.findById(id);

      if (!tarefa) {
        return res.status(404).json({ error: "Tarefa não encontrada" });
      }

      res.json(tarefa);
    } catch (error) {
      next(error);
    }
  }

  // POST /tarefas
  static async createTarefa(req, res, next) {
    try {
      const { titulo, categoria } = req.body;

      // Validação
      if (!titulo || !categoria) {
        return res.status(400).json({
          error: "Título e categoria são obrigatórios",
        });
      }

      if (titulo.length > 100) {
        return res.status(400).json({
          error: "Título deve ter no máximo 100 caracteres",
        });
      }

      const novaTarefa = await Tarefa.create({ titulo, categoria });
      res.status(201).json(novaTarefa);
    } catch (error) {
      next(error);
    }
  }

  // PUT /tarefas/:id
  static async updateTarefa(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Verificar se a tarefa existe
      const tarefaExistente = await Tarefa.findById(id);
      if (!tarefaExistente) {
        return res.status(404).json({ error: "Tarefa não encontrada" });
      }

      const tarefaAtualizada = await Tarefa.update(id, { status });
      res.json(tarefaAtualizada);
    } catch (error) {
      next(error);
    }
  }

  // DELETE /tarefas/:id
  static async deleteTarefa(req, res, next) {
    try {
      const { id } = req.params;

      // Verificar se a tarefa existe
      const tarefaExistente = await Tarefa.findById(id);
      if (!tarefaExistente) {
        return res.status(404).json({ error: "Tarefa não encontrada" });
      }

      const deletado = await Tarefa.delete(id);
      if (deletado) {
        res.json({ message: "Tarefa deletada com sucesso" });
      } else {
        res.status(500).json({ error: "Erro ao deletar tarefa" });
      }
    } catch (error) {
      next(error);
    }
  }

  // GET /tarefas/categoria/:categoria
  static async getTarefasByCategoria(req, res, next) {
    try {
      const { categoria } = req.params;
      const tarefas = await Tarefa.findByCategoria(categoria);
      res.json(tarefas);
    } catch (error) {
      next(error);
    }
  }

  // GET /tarefas/status/:status
  static async getTarefasByStatus(req, res, next) {
    try {
      const { status } = req.params;
      const statusBoolean = status === "true";
      const tarefas = await Tarefa.findByStatus(statusBoolean);
      res.json(tarefas);
    } catch (error) {
      next(error);
    }
  }
}

export default TarefasController;
