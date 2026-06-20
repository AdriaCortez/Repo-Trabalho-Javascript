import { Usuario } from "../../Model/Database/user.database.model.js";
import { token } from "./auth.controller.js";
import { Storage } from "../Storage/cookie.controller.js";
import jwt from "jsonwebtoken";

export function auth(req, res, next) {
  const cookie = Storage(req);

  if (!cookie) {
    return res
      .status(401)
      .json({ error: "usuário não autenticado. Ausência de cookie/token" });
  }

  try {
    const check = jwt.verify(cookie, token);

    req.userId = check.id;

    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
}

export async function Active(req, res, next) {
  //middleware que verifica se o usuário está ativo ou não
  try {
    const user = await Usuario.findById(req.userId).select("-senha");

    if (!user) {
      return res.status(404).json({ error: "Usuário não foi encontrado" });
    }

    if (!user.ativo) {
      return res
        .status(403)
        .json({
          error: "Usuário inativo",
          user: { nome: user.nome, username: user.username },
        });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ error: "Erro interno" });
  }
}
