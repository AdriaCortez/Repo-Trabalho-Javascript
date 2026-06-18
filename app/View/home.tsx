import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export function meta() {
  return [
    { title: "NoTicks" },
    { name: "description", content: "Seu quadro kanban" },
  ];
}

// ─── Tipos ───────────────────────────────────────────────────────────────────
type Prioridade = "baixa" | "media" | "alta";

interface Tarefa {
  id: string;
  titulo: string;
  descricao: string;
  prioridade: Prioridade;
  coluna: Colunas;
}

type Colunas = "pendente" | "em_progresso" | "concluido";

interface Coluna {
  id: Colunas;
  titulo: string;
  cor: string;
  acento: string;
}

// ─── Constantes ──────────────────────────────────────────────────────────────
const COLUNAS: Coluna[] = [
  { id: "pendente",     titulo: "A Fazer",      cor: "border-slate-600",   acento: "bg-slate-600" },
  { id: "em_progresso", titulo: "Em Progresso", cor: "border-violet-500",  acento: "bg-violet-500" },
  { id: "concluido",    titulo: "Concluído",    cor: "border-emerald-500", acento: "bg-emerald-500" },
];

const PRIORIDADE_BADGE: Record<Prioridade, string> = {
  baixa:  "bg-slate-700 text-slate-300",
  media:  "bg-amber-500/20 text-amber-300",
  alta:   "bg-red-500/20 text-red-300",
};

const PRIORIDADE_LABEL: Record<Prioridade, string> = {
  baixa: "Baixa",
  media: "Média",
  alta:  "Alta",
};

const TAREFAS_INICIAIS: Tarefa[] = [
  { id: "1", titulo: "Criar protótipo de tela",   descricao: "Wireframe das telas principais",     prioridade: "alta",   coluna: "pendente"     },
  { id: "2", titulo: "Configurar banco de dados",  descricao: "MongoDB com Mongoose",               prioridade: "alta",   coluna: "em_progresso" },
  { id: "3", titulo: "Implementar autenticação",   descricao: "JWT + bcrypt + cookie httpOnly",     prioridade: "alta",   coluna: "em_progresso" },
  { id: "4", titulo: "Documentar a API",           descricao: "Endpoints e exemplos de uso",        prioridade: "media",  coluna: "pendente"     },
  { id: "5", titulo: "Testes de integração",       descricao: "Cobrir rotas principais",            prioridade: "media",  coluna: "pendente"     },
  { id: "6", titulo: "Setup do projeto",           descricao: "React Router + Tailwind configurado",prioridade: "baixa",  coluna: "concluido"    },
];

// ─── Componente de Tarefa ─────────────────────────────────────────────────────
function CartaoTarefa({
  tarefa,
  onMover,
  onExcluir,
}: {
  tarefa: Tarefa;
  onMover: (id: string, destino: Colunas) => void;
  onExcluir: (id: string) => void;
}) {
  const colunaAtual = COLUNAS.findIndex((c) => c.id === tarefa.coluna);
  const anterior = COLUNAS[colunaAtual - 1];
  const proximo  = COLUNAS[colunaAtual + 1];

  return (
    <div className="group bg-[#1c1e27] border border-white/8 rounded-xl p-4 hover:border-violet-500/40 transition-all duration-200 cursor-default">
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="text-white text-sm font-medium leading-snug">{tarefa.titulo}</h3>
        <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${PRIORIDADE_BADGE[tarefa.prioridade]}`}>
          {PRIORIDADE_LABEL[tarefa.prioridade]}
        </span>
      </div>

      {tarefa.descricao && (
        <p className="text-slate-500 text-xs leading-relaxed mb-4">{tarefa.descricao}</p>
      )}

      <div className="flex items-center justify-between mt-auto">
        <div className="flex gap-1">
          {anterior && (
            <button
              onClick={() => onMover(tarefa.id, anterior.id)}
              title={`Mover para ${anterior.titulo}`}
              className="text-[10px] text-slate-500 hover:text-slate-200 bg-white/5 hover:bg-white/10 rounded-lg px-2 py-1 transition-all"
            >
              ← {anterior.titulo}
            </button>
          )}
          {proximo && (
            <button
              onClick={() => onMover(tarefa.id, proximo.id)}
              title={`Mover para ${proximo.titulo}`}
              className="text-[10px] text-slate-500 hover:text-slate-200 bg-white/5 hover:bg-white/10 rounded-lg px-2 py-1 transition-all"
            >
              {proximo.titulo} →
            </button>
          )}
        </div>
        <button
          onClick={() => onExcluir(tarefa.id)}
          className="text-slate-600 hover:text-red-400 transition-colors text-xs opacity-0 group-hover:opacity-100"
          title="Excluir tarefa"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

// ─── Modal de nova tarefa ─────────────────────────────────────────────────────
function ModalNovaTarefa({
  colunaInicial,
  onCriar,
  onFechar,
}: {
  colunaInicial: Colunas;
  onCriar: (t: Omit<Tarefa, "id">) => void;
  onFechar: () => void;
}) {
  const [titulo, setTitulo]           = useState("");
  const [descricao, setDescricao]     = useState("");
  const [prioridade, setPrioridade]   = useState<Prioridade>("media");
  const [coluna, setColuna]           = useState<Colunas>(colunaInicial);
  const [erro, setErro]               = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!titulo.trim()) { setErro("O título é obrigatório."); return; }
    onCriar({ titulo: titulo.trim(), descricao, prioridade, coluna });
    onFechar();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#16181f] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md p-7">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-semibold text-lg">Nova tarefa</h2>
          <button onClick={onFechar} className="text-slate-500 hover:text-white transition-colors">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">Título</label>
            <input
              autoFocus
              value={titulo}
              onChange={(e) => { setTitulo(e.target.value); setErro(""); }}
              placeholder="O que precisa ser feito?"
              className="w-full bg-[#0f1117] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">Descrição (opcional)</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Detalhes da tarefa…"
              rows={3}
              className="w-full bg-[#0f1117] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">Prioridade</label>
              <select
                value={prioridade}
                onChange={(e) => setPrioridade(e.target.value as Prioridade)}
                className="w-full bg-[#0f1117] border border-white/10 rounded-xl px-3 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-all"
              >
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">Coluna</label>
              <select
                value={coluna}
                onChange={(e) => setColuna(e.target.value as Colunas)}
                className="w-full bg-[#0f1117] border border-white/10 rounded-xl px-3 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-all"
              >
                {COLUNAS.map((c) => (
                  <option key={c.id} value={c.id}>{c.titulo}</option>
                ))}
              </select>
            </div>
          </div>

          {erro && <p className="text-red-400 text-xs">{erro}</p>}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onFechar} className="flex-1 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl py-3 text-sm transition-colors">
              Cancelar
            </button>
            <button type="submit" className="flex-1 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl py-3 text-sm transition-colors">
              Criar tarefa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Home (Board principal) ───────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate();
  const [tarefas, setTarefas]         = useState<Tarefa[]>(TAREFAS_INICIAIS);
  const [usuario, setUsuario]         = useState<string | null>(null);
  const [modalColuna, setModalColuna] = useState<Colunas | null>(null);

  // Tenta buscar dados do usuário autenticado
  useEffect(() => {
    fetch("http://localhost:3700/me", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setUsuario(d.nome ?? d.username ?? null))
      .catch(() => {}); // silencioso — página funciona sem login ativo
  }, []);

  async function handleLogout() {
    await fetch("http://localhost:3700/logout", { method: "POST", credentials: "include" }).catch(() => {});
    navigate("/");
  }

  function moverTarefa(id: string, destino: Colunas) {
    setTarefas((prev) => prev.map((t) => (t.id === id ? { ...t, coluna: destino } : t)));
  }

  function excluirTarefa(id: string) {
    setTarefas((prev) => prev.filter((t) => t.id !== id));
  }

  function criarTarefa(dados: Omit<Tarefa, "id">) {
    setTarefas((prev) => [
      ...prev,
      { ...dados, id: Date.now().toString() },
    ]);
  }

  const total    = tarefas.length;
  const concluidos = tarefas.filter((t) => t.coluna === "concluido").length;
  const progresso  = total > 0 ? Math.round((concluidos / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#0f1117] flex flex-col">
      {/* ─── Navbar ─── */}
      <header className="h-14 border-b border-white/8 flex items-center px-6 gap-4 sticky top-0 bg-[#0f1117]/95 backdrop-blur z-40">
        <div className="flex items-center gap-2 mr-4">
          <span className="text-lg">⬛</span>
          <span className="text-white font-bold text-base tracking-tight">Kanban</span>
        </div>

        {/* Barra de progresso */}
        <div className="hidden sm:flex items-center gap-3 flex-1 max-w-xs">
          <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
            <div
              className="h-full bg-violet-500 rounded-full transition-all duration-500"
              style={{ width: `${progresso}%` }}
            />
          </div>
          <span className="text-slate-400 text-xs tabular-nums">{progresso}%</span>
        </div>

        <div className="ml-auto flex items-center gap-3">
          {usuario && (
            <span className="text-slate-400 text-sm hidden sm:block">
              Olá, <span className="text-white font-medium">{usuario}</span>
            </span>
          )}
          <button
            onClick={handleLogout}
            className="text-xs text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg px-3 py-1.5 transition-all"
          >
            Sair
          </button>
        </div>
      </header>

      {/* ─── Cabeçalho do board ─── */}
      <div className="px-6 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-white font-bold text-2xl tracking-tight">Meu Quadro</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {concluidos} de {total} {total === 1 ? "tarefa concluída" : "tarefas concluídas"}
          </p>
        </div>
        <button
          onClick={() => setModalColuna("pendente")}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-xl px-4 py-2.5 transition-colors"
        >
          <span className="text-lg leading-none">+</span>
          Nova tarefa
        </button>
      </div>

      {/* ─── Board Kanban ─── */}
      <main className="flex-1 px-6 pb-10 overflow-x-auto">
        <div className="flex gap-5 min-w-max pb-4">
          {COLUNAS.map((col) => {
            const tarefasColuna = tarefas.filter((t) => t.coluna === col.id);
            return (
              <div key={col.id} className="w-80 flex flex-col">
                {/* Cabeçalho da coluna */}
                <div className={`flex items-center gap-2.5 mb-4 pb-3 border-b ${col.cor}`}>
                  <div className={`w-2 h-2 rounded-full ${col.acento}`} />
                  <span className="text-white font-semibold text-sm">{col.titulo}</span>
                  <span className="ml-auto text-xs font-mono text-slate-500 bg-white/5 rounded-md px-1.5 py-0.5">
                    {tarefasColuna.length}
                  </span>
                </div>

                {/* Tarefas */}
                <div className="flex flex-col gap-3 flex-1">
                  {tarefasColuna.map((t) => (
                    <CartaoTarefa
                      key={t.id}
                      tarefa={t}
                      onMover={moverTarefa}
                      onExcluir={excluirTarefa}
                    />
                  ))}

                  {/* Adicionar tarefa na coluna */}
                  <button
                    onClick={() => setModalColuna(col.id)}
                    className="w-full border border-dashed border-white/10 hover:border-violet-500/50 rounded-xl py-3 text-slate-600 hover:text-slate-400 text-sm transition-all group"
                  >
                    <span className="group-hover:text-violet-400">+</span> Adicionar tarefa
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* ─── Modal ─── */}
      {modalColuna !== null && (
        <ModalNovaTarefa
          colunaInicial={modalColuna}
          onCriar={criarTarefa}
          onFechar={() => setModalColuna(null)}
        />
      )}
    </div>
  );
}
