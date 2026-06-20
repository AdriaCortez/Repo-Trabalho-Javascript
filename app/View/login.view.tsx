"use client";

import React from "react";
import type { LoginViewPropriedades } from "~/Model/props.model";
export function LoginView({
  username,
  senha,
  setUsername,
  setSenha,
  onSubmit,
}: LoginViewPropriedades) {

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuário"
        />
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
