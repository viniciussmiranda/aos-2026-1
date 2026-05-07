import "dotenv/config";
import cors from "cors";
import express from "express";
import models, { sequelize } from "./models/index.js";
import routes from "./routes/index.js";

const app = express();
app.set("trust proxy", true);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  try {
    await sequelize.authenticate();
    req.context = {
      models,
      me: await models.User.findByLogin("rwieruch").catch(() => null),
    };
    next();
  } catch (err) {
    next(err);
  }
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);
app.use("/tarefas", routes.tarefa);

app.get("/", (req, res) => {
  res.status(200).send(
    "Received a GET HTTP method\nServidor rodando!\n" + process.env.MESSAGE,
  );
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.name === "SequelizeValidationError") {
    return res.status(400).send({
      error: "Bad Request: Validation failed.",
      messages: err.errors.map((e) => e.message),
    });
  }
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).send({
      error: "Conflict: Resource already exists.",
      messages: err.errors.map((e) => e.message),
    });
  }
  res.status(500).send({
    error: "Something went wrong! Internal Server Error.",
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;