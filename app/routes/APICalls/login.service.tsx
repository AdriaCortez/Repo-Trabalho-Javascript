"use client";

import { useState } from "react";
import { useNavigate } from "react-router";
import { LoginView } from "../../View/login.view";

export default function Login() {

    const [username, setUsername] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();

    const Logar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const ApiLogin = await fetch("http://localhost:4000/verificar-login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ username, senha })
            });

            const data = await ApiLogin.json();

            if (ApiLogin.status === 200) {
                console.log("Login bem-sucedido [200]");
                navigate("/tarefas");
                return;
            }

            if (ApiLogin.status === 401 || ApiLogin.status === 404 ) {
                alert("Credenciais inválidas ou usuário não encontrado");
                console.log(data);
                return;
            }

            if (ApiLogin.status === 403 ) {
                navigate('/desativado')
                console.log(data);
                return;
            }

            if (ApiLogin.status === 500) {
                alert("Erro no servidor [500]");
                console.log(data);
                return;
            }

        } catch (error) {
            alert("Erro ao processar requisição");
            console.error(error);
        }
    };

    return (
        <LoginView
            username={username}
            senha={senha}
            setUsername={setUsername}
            setSenha={setSenha}
            onSubmit={Logar}
        />
    );
}