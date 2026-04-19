import { DataTypes } from "sequelize";

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
  });

  model.findByLogin = async (login) => {
    return await model.findOne({
      where: { username: login },
    });
  };

  return model;
};

export default User;