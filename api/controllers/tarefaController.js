import * as tarefaService from "../service/tarefaService.js";

export const getAll = async (req, res, next) => {
  try {
    const tarefas = await tarefaService.getAllTarefas(req.context.models, req.context.me.id);
    return res.status(200).json(tarefas);
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const tarefa = await tarefaService.getTarefaById(req.context.models, req.params.tarefaId);
    return res.status(200).json(tarefa);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const tarefa = await tarefaService.createTarefa(req.context.models, req.body, req.context.me.id);
    return res.status(201).json(tarefa);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const tarefa = await tarefaService.updateTarefa(req.context.models, req.params.tarefaId, req.body);
    return res.status(200).json(tarefa);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await tarefaService.deleteTarefa(req.context.models, req.params.tarefaId);
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};