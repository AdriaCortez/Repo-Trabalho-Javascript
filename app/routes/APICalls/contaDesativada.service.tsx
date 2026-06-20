"use client";

import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function ContaDesativada() {
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [user, setUser] = useState<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function validarUser() {
      try {
        const validation = await fetch("http://localhost:4000/token-enviado", {
          credentials: "include",
        });

        const data = await validation.json();
        console.log("Usuário:", data);

        if (validation.status === 403) {
          setUsername(data.username);
          navigate("/desativado");
          return;
        }

        if (data && data._id) {
          setUsername(data.username);
          return;
        }
      } catch (err) {
        console.error("Erro na validação:", err);
        navigate("/login");
      }
    }

    validarUser();
  }, [navigate]);

  const Reativar = async () => {
    try {
      console.log("Reativando conta...");

      const apiReativar = await fetch("http://localhost:4000/reativar-conta", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          senha,
        }),
      });

      const data = await apiReativar.json();

      if (!apiReativar.ok) {
        alert(data.error);
        console.log(
          "Algo deu errado, não foi possível entrar em contato com o servidor",
        );
        return;
      }

      console.log("Conta reativada com sucesso", data);
      alert(
        "Conta reativada, você está sendo redirecionado pra fazer o login novamente...",
      );

      navigate("/login");
    } catch {
      console.log("Erro ao reativar a conta.");
    }
  };

  const HandleLogout = async () => {
    try {
      console.log("Deslogando...");
      await fetch("http://localhost:4000/logout", {
        method: "POST",
        credentials: "include",
      });
      setUsername("");
      navigate("/");
    } catch (err) {
      console.error("Erro ao deslogar:", err);
    }
  };

  return null;
}
