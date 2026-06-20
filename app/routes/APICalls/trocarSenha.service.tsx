"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function PasswordChange() {
    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [user, setUser] = useState<any>(null);
    const [carregando, setCarregando] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        async function validarUser() {
            try {
                const ApiValidado = await fetch("http://localhost:4000/token-enviado",
                    {
                        credentials: "include",
                    }
                );

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

                setUser(data);

                if (!data || !data._id) {
                    alert(
                        "Usuário não autenticado. Faça o login novamente"
                    );
                    navigate("/login");
                }

                console.log("Usuário validado com sucesso");
            } catch (err) {
                console.error("Erro na validação do usuário", err);

                navigate("/login");
            }
        }

        validarUser();
    }, []);

    const HandleChangePassword = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (novaSenha !== confirmarSenha) {
            alert("As senhas não coincidem.");
            return;
        }

        if (!senhaAtual) {
            alert("Senha atual incorreta.");
            return;
        }

        setCarregando(true);

        try {
            const apiChange = await fetch(
                "http://localhost:4000/change-password",
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        senhaatual: senhaAtual,
                        confirmarsenha: confirmarSenha,
                        novasenha: novaSenha,
                    }),
                }
            );

            const data = await apiChange.json();

            if (!apiChange.ok) {
                console.log(
                    data.message ||
                        "Erro na hora de trocar senha."
                );
                setCarregando(false);
                return;
            }

            setSenhaAtual("");
            setNovaSenha("");
            setConfirmarSenha("");
            setCarregando(false);

            alert("Sua senha foi alterada.");

            Handlelogout();

            return;
        } catch (err) {
            console.log(
                "Erro ao trocar a senha:",
                err
            );

            alert("Erro no servidor");
            setCarregando(false);
        }
    };

    const Handlelogout = async () => {
        try {
            console.log("Deslogando...");

            await fetch(
                "http://localhost:4000/logout",
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            setUser(null);

            console.log("Você foi desconectado");

            alert(
                "Desconectado da sua conta. Entre novamente."
            );

            navigate("/");
        } catch (error) {
            console.error(
                "Não foi possível fazer logout"
            );
        }
    };

    return null;
}