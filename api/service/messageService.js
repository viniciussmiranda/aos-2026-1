import { AppError } from "../errors/AppError.js";

export const getAllMessages = async (models) => {
  return await models.Message.findAll();
};

export const getMessageById = async (models, messageId) => {
  if (isNaN(messageId)) throw new AppError("Invalid ID", 400);

  const message = await models.Message.findByPk(messageId);
  if (!message) throw new AppError("Message not found", 404);

  return message;
};

export const createMessage = async (models, { text }, userId) => {
  if (!text?.trim()) throw new AppError("Text is required", 400);

  return await models.Message.create({ text, userId });
};

export const updateMessage = async (models, messageId, { text }) => {
  if (isNaN(messageId)) throw new AppError("Invalid ID", 400);
  if (!text?.trim()) throw new AppError("Text is required", 400);

  const message = await models.Message.findByPk(messageId);
  if (!message) throw new AppError("Message not found", 404);

  await message.update({ text });
  return message;
};

export const deleteMessage = async (models, messageId) => {
  if (isNaN(messageId)) throw new AppError("Invalid ID", 400);

  const message = await models.Message.findByPk(messageId);
  if (!message) throw new AppError("Message not found", 404);

  await message.destroy();
};