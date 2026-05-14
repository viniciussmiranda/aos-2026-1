import jwt from "jsonwebtoken";
import models from "../models";

const EXPIRY_DAYS = parseInt(process.env.REFRESH_TOKEN_EXPIRY_DAYS ?? "7");

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY ?? "15m" },
  );
};

const createRefreshToken = async (user, expiresAt = null) => {
  const token = models.RefreshToken.generate();
  const expiry = expiresAt ?? models.RefreshToken.expiryDate(EXPIRY_DAYS);

  await models.RefreshToken.create({
    token,
    expiresAt: expiry,
    userId: user.id,
  });
  return token;
};

const login = async (login, password) => {
  const user = await models.User.findByLogin(login);
  if (!user) {
    const error = new Error("Usuário não encontrado.");
    error.status = 404;
    throw error;
  }

  const valid = await user.validatePassword(password);
  if (!valid) {
    const error = new Error("Senha incorreta.");
    error.status = 401;
    throw error;
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = await createRefreshToken(user);

  return { accessToken, refreshToken, user };
};

const refresh = async (token) => {
  const record = await models.RefreshToken.findOne({ where: { token } });

  if (!record) {
    const error = new Error("Refresh token inválido.");
    error.status = 401;
    throw error;
  }

  if (record.expiresAt < new Date()) {
    await record.destroy();
    const error = new Error("Refresh token expirado.");
    error.status = 401;
    throw error;
  }

  const user = await models.User.findByPk(record.userId);
  const expiresAt = record.expiresAt;

  await record.destroy();

  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = await createRefreshToken(user, expiresAt);

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

const logout = async (token) => {
  const record = await models.RefreshToken.findOne({ where: { token } });
  if (record) await record.destroy();
};

export default { login, refresh, logout, generateAccessToken };
