import jwt from "jsonwebtoken";
import models from "../models";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await models.User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
    });
    req.context.me = user ?? null;
  } catch (err) {
    req.context.me = null;
  }

  next();
};

export const authenticate = (req, res, next) => {
  if (!req.context.me) {
    return res.status(401).send({ error: "Não autorizado." });
  }
  next();
};

export default authMiddleware;
