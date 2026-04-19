import { AppError } from "../errors/AppError.js";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const getAllTarefas = async (models, userId) => {
  return await models.Tarefa.findAll({ where: { userId } });
};

export const getTarefaById = async (models, objectId) => {
  if (!UUID_REGEX.test(objectId)) throw new AppError("Invalid ID", 400);

  const tarefa = await models.Tarefa.findByPk(objectId);
  if (!tarefa) throw new AppError("Tarefa not found", 404);

  return tarefa;
};

export const createTarefa = async (models, { descricao, concluida }, userId) => {
  if (!descricao?.trim()) throw new AppError("Descrição is required", 400);

  return await models.Tarefa.create({
    descricao,
    concluida: concluida ?? false,
    userId,
  });
};

export const updateTarefa = async (models, objectId, { descricao, concluida }) => {
  if (!UUID_REGEX.test(objectId)) throw new AppError("Invalid ID", 400);

  const tarefa = await models.Tarefa.findByPk(objectId);
  if (!tarefa) throw new AppError("Tarefa not found", 404);

  await tarefa.update({ descricao, concluida });
  return tarefa;
};

export const deleteTarefa = async (models, objectId) => {
  if (!UUID_REGEX.test(objectId)) throw new AppError("Invalid ID", 400);

  const tarefa = await models.Tarefa.findByPk(objectId);
  if (!tarefa) throw new AppError("Tarefa not found", 404);

  await tarefa.destroy();
};