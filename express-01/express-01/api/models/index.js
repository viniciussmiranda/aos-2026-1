import Sequelize from "sequelize";
import defineUser from "./user.js";
import defineMessage from "./message.js";
import defineTarefa from "./tarefa.js";

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "postgres",
  }
);

const models = {
  User: defineUser(sequelize),
  Message: defineMessage(sequelize),
  Tarefa: defineTarefa(sequelize),
};

// Associações
models.Message.belongsTo(models.User);
models.User.hasMany(models.Message);
models.Tarefa.belongsTo(models.User);
models.User.hasMany(models.Tarefa);

export { sequelize };
export default models;