import React, { useState } from "react";

const TaskItem = ({ task, onToggleStatus, onDeleteTask }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const getCategoryIcon = (category) => {
    const icons = {
      reciclagem: "♻️",
      agua: "💧",
      energia: "⚡",
      transporte: "🚲",
      alimentacao: "🍎",
      consumo: "🛍️",
      natureza: "🌳",
      educacao: "📚",
    };
    return icons[category] || "🌱";
  };

  const getCategoryLabel = (category) => {
    const labels = {
      reciclagem: "Reciclagem",
      agua: "Economia de Água",
      energia: "Economia de Energia",
      transporte: "Transporte Sustentável",
      alimentacao: "Alimentação Sustentável",
      consumo: "Consumo Consciente",
      natureza: "Contato com a Natureza",
      educacao: "Educação Ambiental",
    };
    return labels[category] || category;
  };

  const handleToggleStatus = async () => {
    setIsUpdating(true);
    await onToggleStatus(task.id, task.status);
    setIsUpdating(false);
  };

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
      setIsDeleting(true);
      await onDeleteTask(task.id);
      setIsDeleting(false);
    }
  };

  return (
    <div className={`task-item ${task.status ? "completed" : ""}`}>
      <div className="task-info">
        <div className="task-title">
          {getCategoryIcon(task.categoria)} {task.titulo}
        </div>
        <span className="task-category">
          {getCategoryIcon(task.categoria)}
          {getCategoryLabel(task.categoria)}
        </span>
      </div>

      <div className="task-actions">
        <button
          onClick={handleToggleStatus}
          disabled={isUpdating || isDeleting}
          className={`btn ${task.status ? "btn-outline" : "btn-success"}`}
        >
          {isUpdating ? "⏳" : task.status ? "↶ Desfazer" : "✓ Concluir"}
        </button>

        <button
          onClick={handleDelete}
          disabled={isUpdating || isDeleting}
          className="btn btn-danger"
        >
          {isDeleting ? "⏳" : "🗑️ Excluir"}
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
