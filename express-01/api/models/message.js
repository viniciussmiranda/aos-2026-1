import { DataTypes } from "sequelize";

const Message = (sequelize) =>
  sequelize.define("message", {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

export default Message;