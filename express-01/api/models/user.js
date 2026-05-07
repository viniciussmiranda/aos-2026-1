import { DataTypes } from "sequelize";
import argon2 from "argon2";

const User = (sequelize) => {
  const model = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  const hashPassword = async (user) => {
    if (user.changed("password")) {
      user.password = await argon2.hash(user.password);
    }
  };

  model.addHook("beforeCreate", hashPassword);
  model.addHook("beforeUpdate", hashPassword);

  model.findByLogin = async (login) => {
    return await model.findOne({
      where: { username: login },
    });
  };

  model.prototype.validatePassword = async function (password) {
    return await argon2.verify(this.password, password);
  };

  return model;
};

export default User;