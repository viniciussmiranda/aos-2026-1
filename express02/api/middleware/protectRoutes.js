const WHITELIST = [
  { method: "POST", path: "/session/login" },
  { method: "POST", path: "/session/refresh" },
  { method: "POST", path: "/session/logout" },
  { method: "POST", path: "/users" },
];

const PROTECTED_METHODS = ["POST", "PUT", "DELETE"];

const protectRoutes = (req, res, next) => {
  const method = req.method;
  const path = req.originalUrl.split("?")[0];

  if (!PROTECTED_METHODS.includes(method)) return next();

  const isWhitelisted = WHITELIST.some(
    (entry) => entry.method === method && entry.path === path,
  );

  if (isWhitelisted) return next();

  if (!req.context.me) {
    return res.status(401).send({ error: "Não autorizado." });
  }

  next();
};

export default protectRoutes;
