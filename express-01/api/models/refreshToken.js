import { DataTypes } from "sequelize";

const RefreshToken = (sequelize) => {
  const model = sequelize.define("refreshToken", {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return model;
};

export default RefreshToken;