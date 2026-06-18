import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Usuario } from "../../Model/Database/user.database.model.js";

export const token = process.env.ACESS_JWT_TOKEN;
export async function tokenEnviado(req, res) {
  try {
    const subscribed = await Usuario.findById(req.userId).select("-senha");

    if (!subscribed) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.json(subscribed);
  } catch {
    console.error("Erro em services/authService.js");
  }
}

export async function mudarSenha(req, res) {
  try {
    const { senhaatual, novasenha, confirmarSenha } = req.body;

    if (!senhaatual || !novasenha || !confirmarSenha) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    if (novasenha !== confirmarSenha) {
      return res.status(400).json({ error: "As senhas não coincidem" });
    }

    const user = await Usuario.findById(req.userId).select("+senha");

    if (!user) {
      return res.status(404).json({ error: "Ops. Usuário não encontrado" });
    }

    const correto = await bcrypt.compare(senhaatual, user.senha);

    if (!correto) {
      return res.status(403).json({ error: "Senha atual incorreta" });
    }

    const hashnovasenha = await bcrypt.hash(novasenha, 10);

    user.senha = hashnovasenha;

    await user.save();

    return res.json({ message: "Senha alterada com sucesso!" });
  } catch {
    console.error("Erro em ChangePassword em authService.js");
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
    const senhaCorreta = await bcrypt.compare(senha, user.senha);

    const assinatura = jwt.sign({ id: user._id, email: user.email }, token, {
      expiresIn: "20m",
    });

    if (!senhaCorreta) {
      return res.status(403).json({
        error: "Senha inválida",
      });
    }

    if (!user) {
      return res.status(403).json({
        error: "Erro! Esse email não existe",
      });
    }

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
  } catch {
    console.error("Erro no verifyLogin em authService.js");
  }
}
