import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const API_URL = "http://localhost:3000/api/tarefas";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Buscar tarefas da API
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Erro ao carregar tarefas");
      const data = await response.json();
      setTasks(data);
      setError("");
    } catch (err) {
      setError(
        "Erro ao conectar com o servidor. Verifique se o backend está rodando."
      );
      console.error("Erro:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Adicionar nova tarefa
  const addTask = async (newTask) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao criar tarefa");
      }

      const createdTask = await response.json();
      setTasks((prev) => [createdTask, ...prev]);
      setSuccess("Tarefa adicionada com sucesso! 🌱");
      setError("");

      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
      console.error("Erro:", err);
    }
  };

  // Atualizar status da tarefa
  const toggleTaskStatus = async (taskId, currentStatus) => {
    try {
      const response = await fetch(`${API_URL}/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: !currentStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao atualizar tarefa");
      }

      const updatedTask = await response.json();
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? updatedTask : task))
      );
      setSuccess(`Tarefa ${!currentStatus ? "concluída" : "reaberta"}! ✅`);
      setError("");

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
      console.error("Erro:", err);
    }
  };

  // Deletar tarefa
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao deletar tarefa");
      }

      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      setSuccess("Tarefa deletada com sucesso! 🗑️");
      setError("");

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
      console.error("Erro:", err);
    }
  };

  // Estatísticas
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="container">
      <div className="app-header">
        <h1>🌱 EcoTasks</h1>
        <p>Gestão de Tarefas Sustentáveis</p>
      </div>

      {error && (
        <div className="error">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="success">
          <span>✅</span>
          <span>{success}</span>
        </div>
      )}

      {/* Estatísticas */}
      {!loading && totalTasks > 0 && (
        <div className="stats">
          <div className="stat-card">
            <span className="stat-number">{totalTasks}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-card">
            <span className="stat-number" style={{ color: "#48bb78" }}>
              {completedTasks}
            </span>
            <span className="stat-label">Concluídas</span>
          </div>
          <div className="stat-card">
            <span className="stat-number" style={{ color: "#ed8936" }}>
              {pendingTasks}
            </span>
            <span className="stat-label">Pendentes</span>
          </div>
        </div>
      )}

      <div className="card">
        <TaskForm onAddTask={addTask} />
      </div>

      <div className="card">
        {loading ? (
          <div className="loading">Carregando tarefas</div>
        ) : (
          <TaskList
            tasks={tasks}
            onToggleStatus={toggleTaskStatus}
            onDeleteTask={deleteTask}
          />
        )}
      </div>
    </div>
  );
}

export default App;
