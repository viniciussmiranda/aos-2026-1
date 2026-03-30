import "dotenv/config";
import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Servidor rodando!\n" + process.env.MESSAGE);
});

// 1. GET /random
app.get("/random", (req, res) => {
  const numero = Math.floor(Math.random() * 100) + 1;
  res.send(`Número aleatório: ${numero}`);
});

// 2. GET /dado 
app.get("/dado", (req, res) => {
  const dado = Math.floor(Math.random() * 6) + 1;
  res.send(`Você tirou: ${dado}`);
});

// 3. GET /citacoes
const citacoes = [
  { autor: "Ada Lovelace", citacao: "A Máquina Analítica não tem pretensão alguma de originar qualquer coisa. Ela pode fazer tudo aquilo que soubermos como ordenar que ela faça." },
];

app.get("/citacoes", (req, res) => {
  const indice = Math.floor(Math.random() * citacoes.length);
  res.send(citacoes[indice]);
});

app.use(errorHandler);

export default app;