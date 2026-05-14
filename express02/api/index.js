import "dotenv/config";
import cors from "cors";
import express from "express";

import models, { sequelize } from "./models";
import { session, user, message } from "./routes";
import authMiddleware, { protectRoutes } from "./middleware";

const app = express();
app.set("trust proxy", true);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.context = { models };
  next();
});

app.use(authMiddleware);
app.use(protectRoutes);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use("/session", session);
app.use("/users", user);
app.use("/messages", message);

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "Received a GET HTTP method\nServidor rodando!\n" + process.env.MESSAGE,
    );
});

// Global Error Handler
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

const port = process.env.PORT ?? 3000;
const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC === "true";

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    await createUsersWithMessages();
  }

  app.listen(port, () =>
    console.log(
      "Express app listening on port " + port + "!\n" + process.env.MESSAGE,
    ),
  );
});

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: "rwieruch",
      email: "rwieruch@email.com",
      password: "rwieruch123",
      messages: [{ text: "Published the Road to learn React" }],
    },
    { include: [models.Message] },
  );

  await models.User.create(
    {
      username: "ddavids",
      email: "ddavids@email.com",
      password: "ddavids123",
      messages: [
        { text: "Happy to release ..." },
        { text: "Published a complete ..." },
      ],
    },
    { include: [models.Message] },
  );
};

export default app;
