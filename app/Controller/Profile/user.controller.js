import bcrypt from "bcryptjs";
import { Usuario } from "../../Model/Database/user.database.model.js";

export async function Inscrever(req, res) {
  try {
    const { nome, username, email, senha } = req.body; //pega nome, email e senha do front

    if (!nome || !username || !email || !senha) {
      return res.status(400).json({
        error: "As credenciais completas são obrigatórias",
      });
    }

    const hash = await bcrypt.hash(senha, 10);

    const subs = await Usuario.create({
      nome,
      username,
      email,
      senha: hash,
    }); //Cria um novo usuário e hasheia a senha através do bcrypt

    return res.status(201).json({
      message: "Cadastro salvo!",
      id: subs._id,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Conta já cadastrada " });
    }

    console.error("ERRO NO SUBSCRIBE:", err);
    return res.status(500).json({
      message: "Erro interno",
      error: err.message,
    });
  }
}

export async function Desativar(req, res) {
  try {
    const user = await Usuario.findById(req.userId).select("+senha");

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const { senha } = req.body;

    if (!senha) {
      return res.status(400).json({ message: "Por favor inserir senha" });
    }

    const SenhaCorreta = await bcrypt.compare(senha, user.senha);

    if (!SenhaCorreta) {
      return res
        .status(400)
        .json({ message: "Senha obrigatória pra desativar a conta" });
    }

    user.ativo = false;
    await user.save();

    return res.status(200).json({ message: "Conta desativada" });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Erro ao tentar desativar conta. Verificar userService",
        error: err,
      });
  }
}

export async function Reativar(req, res) {
  try {
    const user = await Usuario.findById(req.userId).select("+senha");

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const { senha } = req.body;

    if (!senha) {
      return res.status(400).json({ message: "Por favor inserir senha" });
    }

    const SenhaCorreta = await bcrypt.compare(senha, user.senha);

    if (!SenhaCorreta) {
      return res.status(400).json({ message: "Senha obrigatória pra desativar a conta" });
    }

    user.ativo = true;
    await user.save();

    return res.status(200).json({ message: "Conta reativada" });
  } catch (err) {
    return res.status(500).json({
        message: "Erro ao tentar reativar conta, verificar userService",
        error: err,
      });
  }
}
