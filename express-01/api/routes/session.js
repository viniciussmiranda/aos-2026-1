import { Router } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const router = Router();

export function generateAccessToken(userId) {
  return jwt.sign(
    { sub: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION || "15m" }
  );
}

export async function generateRefreshToken(userId, models, expiresAt = null) {
  const token = crypto.randomBytes(40).toString("hex");
  const tokenExpiresAt = expiresAt || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await models.RefreshToken.create({ token, expiresAt: tokenExpiresAt, userId });
  return { token, expiresAt: tokenExpiresAt };
}

// POST /session — login
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
    const { token: refreshToken } = await generateRefreshToken(user.id, req.context.models);
    return res.status(201).json({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
});

// DELETE /session — logout
router.delete("/", async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token não fornecido." });
    }
    const tokenRecord = await req.context.models.RefreshToken.findOne({
      where: { token: refreshToken },
    });
    if (!tokenRecord) {
      return res.status(404).json({ error: "Refresh token não encontrado." });
    }
    await tokenRecord.destroy();
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// PUT /session — refresh
router.put("/", async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token não fornecido." });
    }
    const tokenRecord = await req.context.models.RefreshToken.findOne({
      where: { token: refreshToken },
    });
    if (!tokenRecord) {
      return res.status(401).json({ error: "Refresh token inválido." });
    }
    if (new Date() > new Date(tokenRecord.expiresAt)) {
      await tokenRecord.destroy();
      return res.status(401).json({ error: "Refresh token expirado." });
    }
    const oldExpiresAt = tokenRecord.expiresAt;
    await tokenRecord.destroy();
    const accessToken = generateAccessToken(tokenRecord.userId);
    const { token: newRefreshToken } = await generateRefreshToken(
      tokenRecord.userId,
      req.context.models,
      oldExpiresAt
    );
    return res.status(200).json({ accessToken, refreshToken: newRefreshToken });
  } catch (err) {
    next(err);
  }
});

export default router;