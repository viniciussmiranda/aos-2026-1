import { AppError } from "../errors/AppError.js";

export const getAllTarefas = async (models, userId) => {
  return await models.Tarefa.findAll({ where: { userId } });
};

export const getTarefaById = async (models, tarefaId) => {
  if (isNaN(tarefaId)) throw new AppError("Invalid ID", 400);

  const tarefa = await models.Tarefa.findByPk(tarefaId);
  if (!tarefa) throw new AppError("Tarefa not found", 404);

  return tarefa;
};

export const createTarefa = async (models, { descricao, dataDeExpiracao }, userId) => {
  if (!descricao?.trim()) throw new AppError("Descrição is required", 400);

  return await models.Tarefa.create({ descricao, dataDeExpiracao, userId });
};

export const updateTarefa = async (models, tarefaId, { descricao, dataDeExpiracao, concluida }) => {
  if (isNaN(tarefaId)) throw new AppError("Invalid ID", 400);

  const tarefa = await models.Tarefa.findByPk(tarefaId);
  if (!tarefa) throw new AppError("Tarefa not found", 404);

  await tarefa.update({ descricao, dataDeExpiracao, concluida });
  return tarefa;
};

export const deleteTarefa = async (models, tarefaId) => {
  if (isNaN(tarefaId)) throw new AppError("Invalid ID", 400);

  const tarefa = await models.Tarefa.findByPk(tarefaId);
  if (!tarefa) throw new AppError("Tarefa not found", 404);

  await tarefa.destroy();
};