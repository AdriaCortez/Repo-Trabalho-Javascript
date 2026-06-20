"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

type ChecklistItem = {
    texto: string;
    feito: boolean;
};

type Tarefa = {
    _id?: string;
    titulo: string;
    descricao?: string;
    tags?: string[];
    checklist?: ChecklistItem[];
};

export default function Tarefas() {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const [username, setUsername] = useState("");
    const [nome, setNome] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        async function validarUser() {
            try {
                const ApiValidado = await fetch ("http://localhost:4000/token-enviado", { 
                    credentials: "include"
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

                setUsername(data.username);
                setNome(data.nome);
                setTarefas(data.tarefas || []);

                console.log("Usuário validado com sucesso");

            } catch (err) {
                console.error(
                    "Erro na validação do usuário",
                    err
                );

                navigate("/login");
            }
        }

        validarUser();
    }, [navigate]);

    const adicionarTarefa = async (e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();

        try {
            const ApiAdicionarTarefa = await fetch("http://localhost:4000/adicionar-tarefa",
                {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },

                    body: JSON.stringify({ titulo, descricao, tags, checklist, }),
                }
            );

            const data = await ApiAdicionarTarefa.json();

            if (ApiAdicionarTarefa.ok) {
                setTarefas((prev) => [...prev, data.tarefa ]);

                setTitulo("");
                setDescricao("");
                setTags([]);
                setChecklist([]);

                console.log("Tarefa adicionada com sucesso!" );

                return;
            }

            if (ApiAdicionarTarefa.status === 400) {
                alert("Tarefa inválida.");
                return;
            }

            if ( ApiAdicionarTarefa.status === 401 || ApiAdicionarTarefa.status === 403) {
                alert( "Sem permissão para essa ação.");
                return;
            }

            if (ApiAdicionarTarefa.status === 500) {
                alert("Erro no servidor.");
                return;
            }

        } catch (error) {
            console.error("Erro ao adicionar tarefa:", error);
        }

    };

    const editarTarefa  = async (e: React.FormEvent<HTMLFormElement>) => {
        try {

        } catch (error) {
            console.error("Erro ao editar tarefa", error)
        }
    }

    return null;
}