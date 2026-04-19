export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.statusCode) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      error: "Bad Request: Validation failed.",
      messages: err.errors.map((e) => e.message),
    });
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      error: "Conflict: Resource already exists.",
      messages: err.errors.map((e) => e.message),
    });
  }

  res.status(500).json({
    error: "Something went wrong! Internal Server Error.",
    message: err.message,
  });
};