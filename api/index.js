import "dotenv/config";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Servidor rodando!\n" + process.env.MESSAGE);
});

export default app;