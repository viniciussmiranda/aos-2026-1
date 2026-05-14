import crypto from "crypto";

const getRefreshTokenModel = (sequelize, { DataTypes }) => {
  const RefreshToken = sequelize.define("refresh_token", {
    token: {
      type: DataTypes.STRING(512),
      allowNull: false,
      unique: true,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  RefreshToken.associate = (models) => {
    RefreshToken.belongsTo(models.User, { onDelete: "CASCADE" });
  };

  RefreshToken.generate = () => crypto.randomBytes(64).toString("hex");

  RefreshToken.expiryDate = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  };

  return RefreshToken;
};

export default getRefreshTokenModel;
