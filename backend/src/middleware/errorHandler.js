function errorHandler(err, req, res, next) {
  console.error("Erro:", err);

  // Erro de validação
  if (err.message.includes("obrigatórios") || err.message.includes("máximo")) {
    return res.status(400).json({ error: err.message });
  }

  // Erro de não encontrado
  if (err.message.includes("não encontrada")) {
    return res.status(404).json({ error: err.message });
  }

  // Erro de banco de dados
  if (err.message.includes("Erro ao")) {
    return res.status(500).json({
      error: "Erro interno do servidor no banco de dados",
    });
  }

  // Erro genérico
  res.status(500).json({
    error: "Erro interno do servidor",
  });
}

export default errorHandler;
