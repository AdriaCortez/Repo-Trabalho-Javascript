"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { LoginView } from "../../../View/login.view";

export default function Login(){

    const [username, setUsername] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();

    const Logar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const ApiLogin = await fetch("http://localhost:4000/verificar-login", {
                method: "POST", 
                headers: { "Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify({ username: username, senha: senha })
            })

            if(ApiLogin.status === 200) {
                console.log("Login bem-sucedido [200]")
                navigate("/tarefas");
            }

            if(ApiLogin.status === 401 || ApiLogin.status === 404 || ApiLogin.status === 403) {
                alert("Credenciais inválidas ou usuário não encontrado");  
                console.log("As credenciais do usuário estão incorretas ou não existem")
            }

            if(ApiLogin.status === 500) {
                alert("Erro no servidor! [500]")
                console.log("Ocorreu um erro no servidor durante o processo de login. Verifique a infraestrutura ou a rota para mais detalhes")
            }

            const resposta = await ApiLogin.json();

            

        } catch (error) {
            alert("Ocorreu um erro ao processar a requisição. Verifique com o admnistrador do sistema.")
            console.error("Algo deu errado na hora de processar a requisição, verifique o controller dos chamados de API", error);

        }
    }

    return(
        <LoginView
            username={username}
            senha={senha}
            setUsername={setUsername}
            setSenha={setSenha}
            onSubmit={Logar}
        />
    )

}