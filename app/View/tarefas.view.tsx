export default function TarefasView(config: any) {
    const {
        titulo,
        descricao,
        tag,
        checklist,
        username,
        nome,
        tarefa,
        setTitulo,
        setDescricao,
        setTag,
        setChecklist,
        setUsername,
        adicionarTarefa,
        editarTarefa,
        deletarTarefa
    } = config
    
  return (
     <div>
      <h1>Tarefas</h1>
      {nome && <p>Bem-vindo, {nome}!</p>}
    </div>
  );
  ;
}
