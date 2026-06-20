"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

type ChecklistItem = {
    texto: string;
    feito: boolean;
};

type Tarefa = {
    _id?: any;
    titulo: string;
    descricao?: string;
    tag?: string[];
    checklist?: ChecklistItem[];
};

export default function Tarefas() {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tag, setTag] = useState<string[]>([]);
    const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
    const [tarefa, setTarefa] = useState<Tarefa[]>([]);
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
                setTarefa(data.tarefa || []);

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
    }, []);

    const adicionarTarefa = async (id: any, e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();

        try {
            const ApiAdicionarTarefa = await fetch("http://localhost:4000/adicionar-tarefa",
                {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },

                    body: JSON.stringify({ titulo, descricao, tag, checklist, }),
                }
            );

            const data = await ApiAdicionarTarefa.json();

            if (ApiAdicionarTarefa.ok) {
                setTarefa((prev) => [...prev, data.tarefa ]);

                setTitulo("");
                setDescricao("");
                setTag([]);
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

    const editarTarefa = async (id: any, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        const ApiEditarTarefa = await fetch( `http://localhost:4000/editar-tarefa/${id}`,
            {
                method: "PUT",
                credentials: "include",
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify({ titulo, descricao, checklist, tag }),
            }
        );

        const data = await ApiEditarTarefa.json();

        if (ApiEditarTarefa.ok) {

            setTarefa((prev) =>
                prev.map((tarefa) =>
                    tarefa._id === id ? data.tarefa : tarefa )
            );

            console.log(
                "Tarefa atualizada com sucesso!"
            );

            return;
        }

        if (ApiEditarTarefa.status === 400) {
            alert("Dados inválidos.");
            return;
        }

        if (ApiEditarTarefa.status === 401 || ApiEditarTarefa.status === 403) {
            alert("Sem permissão para editar esta tarefa.");
            return;
        }

        if (ApiEditarTarefa.status === 404) {
            alert("Tarefa não encontrada.");
            return;
        }

        if (ApiEditarTarefa.status === 500) { 
            alert("Erro no servidor.");
            return;
        }

    } catch (error) {
        console.error(
            "Erro ao editar tarefa",
            error
        );
    }
};

    const deletarTarefa = async (id: any, e: any) => {
        e.preventDefault();

        try {
            const ApiDeletarTarefa = await fetch(`http://localhost:4000/excluir-tarefa/${id}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {"Content-type": "application/json"},

                }
            )

            const data = await ApiDeletarTarefa.json();

            if (ApiDeletarTarefa.ok) {

                setTarefa((prev) =>
                    prev.filter((tarefa) => tarefa._id !== id));

                console.log("Tarefa excluída com sucesso!");
                return;
            }

            if (ApiDeletarTarefa.status === 400) {
                alert("ID de tarefa inválido.");
                return;
            }

            if (ApiDeletarTarefa.status === 401 || ApiDeletarTarefa.status === 403) {
                 alert("Sem permissão para excluir esta tarefa.");
                return;
            }

            if (ApiDeletarTarefa.status === 404) {
                alert("Tarefa não encontrada.");
                return;
            }

            if (ApiDeletarTarefa.status === 500) {
                alert("Erro no servidor.");
                return;
            }

        } catch (error) {
            console.error("Erro ao excluir tarefa",
                error
            );
        }
    };

    return null;
}