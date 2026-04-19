import * as messageService from "../service/messageService.js";

export const getAll = async (req, res, next) => {
  try {
    const messages = await messageService.getAllMessages(req.context.models);
    return res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const message = await messageService.getMessageById(req.context.models, req.params.messageId);
    return res.status(200).json(message);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const message = await messageService.createMessage(req.context.models, req.body, req.context.me.id);
    return res.status(201).json(message);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const message = await messageService.updateMessage(req.context.models, req.params.messageId, req.body);
    return res.status(200).json(message);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await messageService.deleteMessage(req.context.models, req.params.messageId);
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};