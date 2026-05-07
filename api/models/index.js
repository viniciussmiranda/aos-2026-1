import Sequelize from "sequelize";
import defineUser from "./user.js";
import defineMessage from "./message.js";
import defineTarefa from "./tarefa.js";
import defineRefreshToken from "./refreshToken.js";

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
);

const models = {
  User: defineUser(sequelize),
  Message: defineMessage(sequelize),
  Tarefa: defineTarefa(sequelize),
  RefreshToken: defineRefreshToken(sequelize),
};


models.Message.belongsTo(models.User);
models.User.hasMany(models.Message);

models.Tarefa.belongsTo(models.User);
models.User.hasMany(models.Tarefa);

models.RefreshToken.belongsTo(models.User);   
models.User.hasMany(models.RefreshToken);      

export { sequelize };
export default models;