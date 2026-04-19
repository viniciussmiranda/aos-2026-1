import * as userService from "../service/userService.js";

export const getAll = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers(req.context.models);
    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.context.models, req.params.userId);
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.context.models, req.body);
    return res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.context.models, req.params.userId, req.body);
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await userService.deleteUser(req.context.models, req.params.userId);
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};