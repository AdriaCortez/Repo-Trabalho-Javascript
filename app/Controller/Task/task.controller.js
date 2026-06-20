import { Tarefa } from "../../Model/task.database.model.js";

export async function createTask(req, res) {
  try {
    const { titulo, descricao, checklist, tag } = req.body;

    if (!titulo) {
      return res.status(400).json({
        error: "Título é obrigatório",
      });
    }

    const novaTarefa = await Tarefa.create({
      titulo,
      descricao,
      checklist,
      tag,
      criadoPor: req.userId,
    });

    if (res.status(401)) {
      return res.status(401).json({
        error: "Usuário não está autenticado, não é possível criar tarefa",
      });
    }

    return res.status(201).json({
      message: "Tarefa criada com sucesso",
      tarefa: novaTarefa,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao criar tarefa",
      error: error.message,
    });
  }
}

export async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { titulo, descricao, checklist, tag } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "ID inválido",
      });
    }

    const tarefa = await Tarefa.findByIdAndUpdate(
      id,
      {
        titulo,
        descricao,
        checklist,
        tag,
      },
      { new: true },
    );

    if (!tarefa) {
      return res.status(404).json({
        error: "Tarefa não encontrada",
      });
    }

    return res.status(200).json({
      message: "Tarefa atualizada com sucesso",
      tarefa,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao atualizar tarefa",
      detalhe: error.message,
    });
  }
}

export async function deleteTask(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "ID inválido",
      });
    }

    const tarefa = await Task.findById(id);

    if (!tarefa) {
      return res.status(404).json({
        error: "Tarefa não encontrada",
      });
    }

    await tarefa.deleteOne();

    return res.status(200).json({
      message: "Tarefa excluída com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao excluir tarefa",
      detalhe: error.message,
    });
  }
}
