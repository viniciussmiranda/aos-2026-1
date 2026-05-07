import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

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

  // ── Hooks ──────────────────────────────────────────────
  const hashPassword = async (user) => {
    if (user.changed("password")) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  };

  model.addHook("beforeCreate", hashPassword);
  model.addHook("beforeUpdate", hashPassword);

  // ── Methods ────────────────────────────────────────────
  model.findByLogin = async (login) => {
    return await model.findOne({
      where: { username: login },
    });
  };

  model.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return model;
};

export default User;