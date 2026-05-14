import Sequelize from "sequelize";

import getUserModel from "./user";
import getMessageModel from "./message";
import getRefreshTokenModel from "./refreshToken";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  dialectModule: require("pg"),
});

const models = {
  User: getUserModel(sequelize, Sequelize),
  Message: getMessageModel(sequelize, Sequelize),
  RefreshToken: getRefreshTokenModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };
export default models;
