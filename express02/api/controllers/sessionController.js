import { sessionService, userService } from "../services";

const getSession = async (req, res) => {
  const user = await userService.getUserById(req.context.me.id);
  if (!user) return res.status(404).send();
  return res.status(200).send(user);
};

const login = async (req, res, next) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).send({ error: "Login e senha são obrigatórios." });
    }

    const { accessToken, refreshToken, user } = await sessionService.login(
      login,
      password,
    );

    return res.status(200).send({ accessToken, refreshToken, userId: user.id });
  } catch (err) {
    if (err.status) return res.status(err.status).send({ error: err.message });
    next(err);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).send({ error: "Refresh token é obrigatório." });
    }

    const tokens = await sessionService.refresh(refreshToken);
    return res.status(200).send(tokens);
  } catch (err) {
    if (err.status) return res.status(err.status).send({ error: err.message });
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).send({ error: "Refresh token é obrigatório." });
    }

    await sessionService.logout(refreshToken);
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export default { getSession, login, logout, refresh };
