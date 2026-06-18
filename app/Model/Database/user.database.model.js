import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
    unique: true,
    set: (value) => {
      if (!value) return value;

      return value.startsWith("@") ? value : `@${value}`;
    },
  }, //No caso, o usuário vai colocar @usuário ou algo assim

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, //pode ser validado com tudo em minusculo
    trim: true, //evita espaço
    match: [/^\S+@\S+\.\S+$/, "Email inválido"], //SIgnifica que o email tem que ter @ e .
  },

  senha: {
    type: String,
    required: true,
  },

  ativo: {
    type: Boolean,
    default: true,
  },
});

export const Usuario = mongoose.model("User", UserSchema);
