export const errorHandler = (err, req, res, next) => {
  // Erro intencional lançado pela aplicação (400, 409, etc.)
  if (err.statusCode) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // Erro do Sequelize: violação de unique (ex: email duplicado) → 409
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({ error: "Resource already exists" });
  }

  // Qualquer erro inesperado → 500
  console.error(err);
  return res.status(500).json({ error: "Internal server error" });
};