"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  const Cadastrar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const ApiCadastro = await fetch("http://localhost:4000/inscrever", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          nome: nome,
          email: email,
          username: username,
          senha: senha,
        }),
      });

      const resposta = await ApiCadastro.json();

      if (ApiCadastro.status === 201) {
        alert(
          "Cadastro realizado com sucesso! Redirecionando para a página de login...",
        );
        navigate("/login");
      }

      if (ApiCadastro.status === 400 || ApiCadastro.status === 409) {
        alert(
          "Esse usuário já existe ou os dados são inválidos. Por favor, tente novamente 409",
        );
        console.log(
          "Ocorreu um erro durante o processo de cadastro. Verifique se o usuário já existe",
        );
      }

      if (ApiCadastro.status === 500) {
        alert("Erro no servidor! [500]");
        console.log(
          "Ocorreu um erro no servidor durante o processo de cadastro. Verifique a infraestrutura ou a rota para mais detalhes",
        );
      }
    } catch (error) {
      alert(
        "Ocorreu um erro ao processar a requisição. Verifique com o admnistrador do sistema.",
      );
      console.error(
        "Algo deu errado na hora de processar a requisição, verifique o controller dos chamados de API",
        error,
      );
    }
  };

  return (
    <div>
      <h1>Cadastro</h1>
      <form onSubmit={Cadastrar}>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
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
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
