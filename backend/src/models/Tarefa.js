import pool from "../config/database.js";

class Tarefa {
  // Buscar todas as tarefas
  static async findAll() {
    try {
      const [rows] = await pool.execute(`
        SELECT * FROM tarefas 
        ORDER BY created_at DESC
      `);
      return rows;
    } catch (error) {
      throw new Error(`Erro ao buscar tarefas: ${error.message}`);
    }
  }

  // Buscar tarefa por ID
  static async findById(id) {
    try {
      const [rows] = await pool.execute("SELECT * FROM tarefas WHERE id = ?", [
        id,
      ]);
      return rows[0];
    } catch (error) {
      throw new Error(`Erro ao buscar tarefa: ${error.message}`);
    }
  }

  // Criar nova tarefa
  static async create(tarefaData) {
    try {
      const { titulo, categoria } = tarefaData;

      const [result] = await pool.execute(
        "INSERT INTO tarefas (titulo, categoria) VALUES (?, ?)",
        [titulo, categoria]
      );

      return await this.findById(result.insertId);
    } catch (error) {
      throw new Error(`Erro ao criar tarefa: ${error.message}`);
    }
  }

  // Atualizar tarefa
  static async update(id, tarefaData) {
    try {
      const { status } = tarefaData;

      await pool.execute("UPDATE tarefas SET status = ? WHERE id = ?", [
        status,
        id,
      ]);

      return await this.findById(id);
    } catch (error) {
      throw new Error(`Erro ao atualizar tarefa: ${error.message}`);
    }
  }

  // Deletar tarefa
  static async delete(id) {
    try {
      const [result] = await pool.execute("DELETE FROM tarefas WHERE id = ?", [
        id,
      ]);

      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Erro ao deletar tarefa: ${error.message}`);
    }
  }

  // Buscar tarefas por categoria
  static async findByCategoria(categoria) {
    try {
      const [rows] = await pool.execute(
        "SELECT * FROM tarefas WHERE categoria = ? ORDER BY created_at DESC",
        [categoria]
      );
      return rows;
    } catch (error) {
      throw new Error(`Erro ao buscar tarefas por categoria: ${error.message}`);
    }
  }

  // Buscar tarefas por status
  static async findByStatus(status) {
    try {
      const [rows] = await pool.execute(
        "SELECT * FROM tarefas WHERE status = ? ORDER BY created_at DESC",
        [status]
      );
      return rows;
    } catch (error) {
      throw new Error(`Erro ao buscar tarefas por status: ${error.message}`);
    }
  }
}

export default Tarefa;
