import { AppError } from "../errors/AppError.js";

export const getAllUsers = async (models) => {
  return await models.User.findAll();
};

export const getUserById = async (models, userId) => {
  if (isNaN(userId)) throw new AppError("Invalid ID", 400);
  const user = await models.User.findByPk(userId);
  if (!user) throw new AppError("User not found", 404);
  return user;
};

export const createUser = async (models, { username, email, password }) => {
  if (!username?.trim() || !email?.trim() || !password?.trim()) {
    throw new AppError("Username, email and password are required", 400);
  }
  return await models.User.create({ username, email, password });
};

export const updateUser = async (models, userId, { username, email }) => {
  if (isNaN(userId)) throw new AppError("Invalid ID", 400);
  if (!username?.trim() || !email?.trim()) {
    throw new AppError("Username and email are required", 400);
  }
  const user = await models.User.findByPk(userId);
  if (!user) throw new AppError("User not found", 404);
  await user.update({ username, email });
  return user;
};

export const deleteUser = async (models, userId) => {
  if (isNaN(userId)) throw new AppError("Invalid ID", 400);
  const user = await models.User.findByPk(userId);
  if (!user) throw new AppError("User not found", 404);
  await user.destroy();
};