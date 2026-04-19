import { Router } from "express";
import { AppError } from "../errors/AppError.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const user = await req.context.models.User.findByPk(req.context.me.id);

    if (!user) {
      throw new AppError("Session user not found", 404);
    }

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

export default router;