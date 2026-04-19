import { DataTypes } from "sequelize";

const Tarefa = (sequelize) =>
  sequelize.define("tarefa", {
    objectId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    concluida: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

export default Tarefa;