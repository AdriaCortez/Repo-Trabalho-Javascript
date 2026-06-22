import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Usuario } from "../../Model/Database/user.database.model.js";
import { Tarefa } from "../../Model/Database/task.database.model.js";
import { ClearStorage } from "../Storage/cookie.controller.js";

export const token = process.env.ACESS_JWT_TOKEN;
export async function tokenEnviado(req, res) {
  try {
    const subscribed = await Usuario.findById(req.userId).select("-senha");

    if (!subscribed) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const verificarTarefa = await Tarefa.find({ criadoPor: req.userId }).sort({
      criadoEm: -1,
    });

    return res.json({ ...subscribed.toObject(), tarefa: verificarTarefa });
  } catch (err) {
    console.error("Erro em services/authService.js", err);
    return res.status(500).json({ error: "Erro interno" });
  }
}

export async function logout(req, res) {
  try {
    ClearStorage(req, res);
    return res.json({ message: "Logout realizado com sucesso" });
  } catch (err) {
    console.error("Erro de logout em auth.controller.js", err);
    return res.status(500).json({ error: "Erro ao fazer logout" });
  }
}

export async function mudarSenha(req, res) {
  try {
    const { senhaAtual, novaSenha, confirmarSenha } = req.body;

    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    if (novaSenha !== confirmarSenha) {
      return res.status(400).json({ error: "As senhas não coincidem" });
    }

    const user = await Usuario.findById(req.userId).select("+senha");

    if (!user) {
      return res.status(404).json({ error: "Ops. Usuário não encontrado" });
    }

    const correto = await bcrypt.compare(senhaAtual, user.senha);

    if (!correto) {
      return res.status(401).json({ error: "Senha atual incorreta" });
    }

    const hashnovasenha = await bcrypt.hash(novaSenha, 10);

    user.senha = hashnovasenha;

    await user.save();

    return res.json({ message: "Senha alterada com sucesso!" });
  } catch (err) {
    console.error("Erro em ChangePassword em authService.js", err);
    return res.status(500).json({ error: "Erro ao mudar senha" });
  }
}
export async function verificarLogin(req, res) {
  try {
    console.log("Verificando credenciais...");

    const { username, senha } = req.body;

    if (!username || !senha) {
      return res.status(400).json({
        error: "Cadastro inválido! Nome de usuário e senha obrigatórios",
      });
    }

    const user = await Usuario.findOne({ username }).select("+senha");

    if (!user) {
      return res.status(401).json({
        error: "Erro! Esse usuário não existe",
      });
    }

    const senhaCorreta = await bcrypt.compare(senha, user.senha);

    if (!senhaCorreta) {
      return res.status(401).json({
        error: "Senha inválida",
      });
    }

    const assinatura = jwt.sign({ id: user._id, email: user.email }, token, {
      expiresIn: "20m",
    });

    if (!user.ativo) {
      res.cookie("cookie-auth", assinatura, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 20 * 60 * 1000,
      }); //cookie adicionado aqui para evitar que, mesmo que o usuário fique desativado, as informações dele sejam passadas pelo front pra que ele possa reativar a conta

      return res.status(403).json({
        error: "Conta desativada",
        podeAtivar: true,
      });
    }

    res.cookie("cookie-auth", assinatura, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 20 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login realizado com sucesso",
      Usuario: { id: user._id },
    });
  } catch (err) {
    console.error("Erro no verifyLogin em authService.js", err);
    return res.status(500).json({ error: "Erro ao fazer login" });
  }
}
