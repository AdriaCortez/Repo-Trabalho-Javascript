import { Task } from "../../Model/task.database.model.js";

export async function createTask(req, res) {

    try {

        const { titulo, descricao } = req.body;

        if (!titulo) {
            return res.status(400).json({
                error: "Título é obrigatório"
            });
        }

        const novaTarefa = await Tarefa.create({
            titulo,
            descricao,
            criadoPor: req.userId
        });

        return res.status(201).json({
            message: "Tarefa criada com sucesso",
            tarefa: novaTarefa
        });

    } catch (error) {

        return res.status(500).json({
            message: "Erro ao criar tarefa",
            error: error.message
        });

    }

}

export async function updateTask(req, res) {

    try {

        const { id } = req.params;
        const { titulo, descricao } = req.body;

        const tarefa = await Tarefa.findById(id);

        if (!tarefa) {
            return res.status(404).json({
                error: "Tarefa não encontrada"
            });
        }

        if (titulo) {
            tarefa.titulo = titulo;
        }

        if (descricao) {
            tarefa.descricao = descricao;
        }

        await tarefa.save();

        return res.status(200).json({
            message: "Tarefa atualizada com sucesso",
            tarefa
        });

    } catch (error) {

        return res.status(500).json({
            error: "Erro ao atualizar tarefa",
            detalhe: error.message
        });

    }

}

export async function deleteTask(req, res) {

    try {

        const { id } = req.params;

        const tarefa = await Tarefa.findById(id);

        if (!tarefa) {
            return res.status(404).json({
                error: "Tarefa não encontrada"
            });
        }

        await tarefa.deleteOne();

        return res.status(200).json({
            message: "Tarefa excluída com sucesso"
        });

    } catch (error) {

        return res.status(500).json({
            error: "Erro ao excluir tarefa",
            detalhe: error.message
        });

    }

}
