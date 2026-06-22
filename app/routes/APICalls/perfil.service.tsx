"use client";

// Funções que aparecem na página de perfil
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import PerfilView from "~/View/perfil.view";

export default function Perfil() {
  const [nome, setNome] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function validarUser() {
      try {
        const ApiValidado = await fetch("http://localhost:4000/token-enviado", {
          credentials: "include",
        });

        if (!ApiValidado.ok) {
          if (ApiValidado.status === 403) {
            alert("Conta desativada.");
            navigate("/desativado");
          } else {
            navigate("/login");
          }
          return;
        }

        const data = await ApiValidado.json();

        setNome(data.nome || "");
        setUsername(data.username || "");
        setEmail(data.email || "");

      } catch (error) {
        console.error("Ocorreu um erro ao tentar carregar cookie", error);
        navigate("/login");
      }
    }

    validarUser();
  }, [navigate]);

  const DesativarConta = async () => {
    try {
      const ApiDesativarConta = await fetch(
        "http://localhost:4000/desativar-conta",
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ senha }),
        },
      );

      const data = await ApiDesativarConta.json();

      if (!ApiDesativarConta.ok) {
        alert("Algo deu errado ao desativar conta");
        console.error("Erro ao desativar conta", data);
        return;
      }

      if(ApiDesativarConta.status === 401) {
        alert("Credenciais inválidas")
        console.log("Ops! Algo deu errado nas credenciais")
      }

      console.log("Usuário desativado com sucesso");
      alert("Conta desativada!");
      navigate("/");

    } catch (error) {
        
      alert("Ops! Algo deu errado em DesativarConta. Tente novamente");
      console.error(
        "Algo deu errado ao processar requisição de desativar conta. Verifique o front end",
        error,
      );
    }
  };

  return (
    <PerfilView
      nome={nome}
      setNome={setNome}
      username={username}
      setUsername={setUsername}
      email={email}
      setEmail={setEmail}
      senha={senha}
      setSenha={setSenha}
      DesativarConta={DesativarConta}
    />
  );
}
