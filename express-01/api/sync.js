import "dotenv/config";
import models, { sequelize } from "./models/index.js";

sequelize.sync({ alter: true })
  .then(() => {
    console.log("Banco sincronizado!");
    return sequelize.close();
  })
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Erro ao sincronizar:", err);
    process.exit(1);
  });
