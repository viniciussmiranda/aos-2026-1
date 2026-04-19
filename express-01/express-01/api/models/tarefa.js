import { DataTypes } from "sequelize";

const Tarefa = (sequelize) =>
  sequelize.define("tarefa", {
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dataDeExpiracao: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    concluida: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

export default Tarefa;