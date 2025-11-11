import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onToggleStatus, onDeleteTask }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <h3>Nenhuma tarefa encontrada</h3>
        <p>Comece adicionando sua primeira tarefa sustentável!</p>
        <p style={{ marginTop: "10px", fontSize: "0.9rem", opacity: 0.7 }}>
          🌍 Pequenas ações fazem grande diferença para o planeta
        </p>
      </div>
    );
  }

  const pendingTasks = tasks.filter((task) => !task.status);
  const completedTasks = tasks.filter((task) => task.status);

  return (
    <div>
      <h2 style={{ marginBottom: "20px", color: "#2d3748" }}>
        Minhas Tarefas Sustentáveis ({tasks.length})
      </h2>

      {pendingTasks.length > 0 && (
        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px", color: "#4a5568" }}>
            📋 Pendentes ({pendingTasks.length})
          </h3>
          <div className="task-list">
            {pendingTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleStatus={onToggleStatus}
                onDeleteTask={onDeleteTask}
              />
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <h3 style={{ marginBottom: "15px", color: "#4a5568" }}>
            ✅ Concluídas ({completedTasks.length})
          </h3>
          <div className="task-list">
            {completedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleStatus={onToggleStatus}
                onDeleteTask={onDeleteTask}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
