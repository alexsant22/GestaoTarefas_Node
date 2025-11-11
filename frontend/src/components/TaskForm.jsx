import React, { useState } from "react";

const TaskForm = ({ onAddTask }) => {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("reciclagem");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categorias = [
    { value: "reciclagem", label: "♻️ Reciclagem" },
    { value: "agua", label: "💧 Economia de Água" },
    { value: "energia", label: "⚡ Economia de Energia" },
    { value: "transporte", label: "🚲 Transporte Sustentável" },
    { value: "alimentacao", label: "🍎 Alimentação Sustentável" },
    { value: "consumo", label: "🛍️ Consumo Consciente" },
    { value: "natureza", label: "🌳 Contato com a Natureza" },
    { value: "educacao", label: "📚 Educação Ambiental" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titulo.trim()) {
      alert("Por favor, digite um título para a tarefa");
      return;
    }

    if (titulo.trim().length > 100) {
      alert("O título deve ter no máximo 100 caracteres");
      return;
    }

    setIsSubmitting(true);

    const newTask = {
      titulo: titulo.trim(),
      categoria,
    };

    await onAddTask(newTask);

    // Limpar formulário apenas se foi sucesso
    setTitulo("");
    setCategoria("reciclagem");
    setIsSubmitting(false);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2 style={{ marginBottom: "20px", color: "#2d3748" }}>
        Adicionar Nova Tarefa Sustentável
      </h2>

      <div className="form-group">
        <label htmlFor="titulo">Título da Tarefa:</label>
        <input
          type="text"
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ex: Separar o lixo reciclável, Desligar as luzes ao sair..."
          maxLength="100"
          disabled={isSubmitting}
          required
        />
        <small style={{ color: "#718096", fontSize: "0.8rem" }}>
          {titulo.length}/100 caracteres
        </small>
      </div>

      <div className="form-group">
        <label htmlFor="categoria">Categoria:</label>
        <select
          id="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          disabled={isSubmitting}
        >
          {categorias.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isSubmitting || !titulo.trim()}
      >
        {isSubmitting ? "⏳ Adicionando..." : "➕ Adicionar Tarefa"}
      </button>
    </form>
  );
};

export default TaskForm;
