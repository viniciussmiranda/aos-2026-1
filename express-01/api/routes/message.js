import { Router } from "express";
import { AppError } from "../errors/AppError.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const messages = await req.context.models.Message.findAll();
    return res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
});

router.get("/:messageId", async (req, res, next) => {
  try {
    const { messageId } = req.params;

    if (isNaN(messageId)) {
      throw new AppError("Invalid ID", 400); // 400
    }

    const message = await req.context.models.Message.findByPk(messageId);

    if (!message) {
      throw new AppError("Message not found", 404);
    }

    return res.status(200).json(message);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text?.trim()) {
      throw new AppError("Text is required", 400); // 400
    }

    // Se violar unique no Sequelize → errorHandler trata como 409
    const message = await req.context.models.Message.create({
      text,
      userId: req.context.me.id,
    });

    return res.status(201).json(message);
  } catch (err) {
    next(err);
  }
});

router.put("/:messageId", async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const { text } = req.body;

    if (isNaN(messageId)) {
      throw new AppError("Invalid ID", 400); // 400
    }

    if (!text?.trim()) {
      throw new AppError("Text is required", 400); // 400
    }

    const message = await req.context.models.Message.findByPk(messageId);

    if (!message) {
      throw new AppError("Message not found", 404);
    }

    await message.update({ text });

    return res.status(200).json(message);
  } catch (err) {
    next(err);
  }
});

router.delete("/:messageId", async (req, res, next) => {
  try {
    const { messageId } = req.params;

    if (isNaN(messageId)) {
      throw new AppError("Invalid ID", 400); // 400
    }

    const message = await req.context.models.Message.findByPk(messageId);

    if (!message) {
      throw new AppError("Message not found", 404);
    }

    await message.destroy();

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;