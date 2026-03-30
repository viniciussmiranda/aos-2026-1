import { Router } from "express";
import { AppError } from "../errors/AppError.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await req.context.models.User.findAll();
    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (isNaN(userId)) {
      throw new AppError("Invalid ID", 400); // 400
    }

    const user = await req.context.models.User.findByPk(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { username, email } = req.body;

    if (!username?.trim() || !email?.trim()) {
      throw new AppError("Username and email are required", 400); // 400
    }

    // Se email já existir no banco → Sequelize lança UniqueConstraintError → errorHandler trata como 409
    const newUser = await req.context.models.User.create({ username, email });

    return res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.put("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { username, email } = req.body;

    if (isNaN(userId)) {
      throw new AppError("Invalid ID", 400); // 400
    }

    if (!username?.trim() || !email?.trim()) {
      throw new AppError("Username and email are required", 400); // 400
    }

    const user = await req.context.models.User.findByPk(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    await user.update({ username, email });

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

router.delete("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (isNaN(userId)) {
      throw new AppError("Invalid ID", 400); // 400
    }

    const user = await req.context.models.User.findByPk(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    await user.destroy();

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;