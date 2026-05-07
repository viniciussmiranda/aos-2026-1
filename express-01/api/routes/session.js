import { Router } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const router = Router();

export function generateAccessToken(userId) {
  return jwt.sign(
    { sub: userId },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
}

export async function generateRefreshToken(userId, models) {
  const token = crypto.randomBytes(40).toString("hex");
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await models.RefreshToken.create({ token, expiresAt, userId });

  return token;
}

router.post("/", async (req, res, next) => {
  try {
    const { login, password } = req.body;

    const user = await req.context.models.User.findByLogin(login);
    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const valid = await user.validatePassword(password);
    if (!valid) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = await generateRefreshToken(user.id, req.context.models);

    return res.status(201).json({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
});

export default router;