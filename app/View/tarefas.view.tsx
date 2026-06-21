// ~/View/tarefas.view.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";

type ChecklistItem = {
  texto: string;
  concluido: boolean;
};

type Tarefa = {
  _id?: any;
  titulo: string;
  descricao?: string;
  tag?: string[];
  checklist?: ChecklistItem[];
};

type Props = {
  titulo: string;
  descricao: string;
  tag: string[];
  checklist: ChecklistItem[];
  username: string;
  nome: string;
  tarefa: Tarefa[];
  setTitulo: (titulo: string) => void;
  setDescricao: (descricao: string) => void;
  setTag: (tag: string[]) => void;
  setChecklist: (checklist: ChecklistItem[]) => void;
  setUsername: (username: string) => void;
  adicionarTarefa: (id: any, e: React.FormEvent<HTMLFormElement>) => void;
  editarTarefa: (id: any, e: React.FormEvent<HTMLFormElement>) => void;
  deletarTarefa: (id: any, e: any) => void;
  Logout: () => void;
};

export default function TarefasView({
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
  deletarTarefa,
  Logout,
}: Props) {
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [novaTag, setNovaTag] = useState("");
  const [corTag, setCorTag] = useState("#C97B63"); // Cor padrão terracota
  const [itensChecklist, setItensChecklist] = useState<string[]>([""]);
  const [showLimitAlert, setShowLimitAlert] = useState(false);

  // Estado para edição
  const [tarefaEmEdicao, setTarefaEmEdicao] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cores disponíveis para tags (temática livraria/cafeteria)
  const coresDisponiveis = [
    { nome: "Terracota", hex: "#C97B63" },
    { nome: "Sálvia", hex: "#8A9A7B" },
    { nome: "Mostarda", hex: "#D4A95F" },
    { nome: "Ameixa", hex: "#7B6B8A" },
    { nome: "Café", hex: "#6B4F3F" },
    { nome: "Papel", hex: "#E8DFD0" },
  ];

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fechar todos os modais
  const fecharTodosModais = () => {
    setIsAddModalOpen(false);
    setIsTagModalOpen(false);
    setIsChecklistModalOpen(false);
    setTarefaEmEdicao(null);
    // Resetar formulário
    setTitulo("");
    setDescricao("");
    setTag([]);
    setChecklist([]);
    setNovaTag("");
    setCorTag("#C97B63");
    setItensChecklist([""]);
  };

  // Abrir modal de adição
  const abrirModalAdicao = () => {
    if (tarefa.length >= 20) {
      setShowLimitAlert(true);
      return;
    }
    setTarefaEmEdicao(null);
    setIsAddModalOpen(true);
  };

  // Abrir modal de edição
  const abrirModalEdicao = (t: Tarefa) => {
    setTarefaEmEdicao(t._id);
    setTitulo(t.titulo);
    setDescricao(t.descricao || "");
    setTag(t.tag || []);
    setChecklist(t.checklist || []);
    setIsAddModalOpen(true);
  };

  // Função auxiliar para submissão
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tarefaEmEdicao) {
      editarTarefa(tarefaEmEdicao, e);
    } else {
      adicionarTarefa(null, e);
    }
    fecharTodosModais();
  };

  // Adicionar tag
  const handleAdicionarTag = () => {
    if (novaTag.trim() && !tag.includes(novaTag.trim())) {
      setTag([...tag, novaTag.trim()]);
    }
    setNovaTag("");
    setIsTagModalOpen(false);
  };

  // Adicionar item à checklist
  const adicionarItemChecklist = () => {
    if (itensChecklist.length < 15) {
      setItensChecklist([...itensChecklist, ""]);
    }
  };

  // Remover item da checklist
  const removerItemChecklist = (index: number) => {
    const novosItens = itensChecklist.filter((_, i) => i !== index);
    setItensChecklist(novosItens);
  };

  // Atualizar item da checklist
  const atualizarItemChecklist = (index: number, valor: string) => {
    const novosItens = [...itensChecklist];
    novosItens[index] = valor;
    setItensChecklist(novosItens);
  };

  // Salvar checklist
  const salvarChecklist = () => {
    const checklistValida = itensChecklist
      .filter((item) => item.trim())
      .map((item) => ({ texto: item.trim(), concluido: false }));
    setChecklist(checklistValida);
    setIsChecklistModalOpen(false);
  };

  // Navegar para configurações
  const Configuracoes = () => {
    setIsDropdownOpen(false);
    navigate("/configuracoes");
  };

  // Logout
  const handleLogout = () => {
    setIsDropdownOpen(false);
    Logout();
  };

  // Iniciais do usuário para o avatar
  const iniciais = nome
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundColor: "#F5EFE6",
        color: "#2A2520",
        fontFamily: '"Inter", system-ui, sans-serif',
      }}
    >
      {/* Textura de papel sutil */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.03] z-0"
        style={{
          backgroundImage:
            "radial-gradient(#2A2520 1px, transparent 1px), radial-gradient(#2A2520 1px, transparent 1px)",
          backgroundSize: "20px 20px, 40px 40px",
          backgroundPosition: "0 0, 10px 10px",
        }}
      />

      {/* HEADER — Tom café escuro */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-30 px-6 md:px-10 py-4 flex items-center justify-between border-b-2 border-[#2A2520]"
        style={{
          backgroundColor: "#2A2520",
          color: "#F5EFE6",
          boxShadow: "0 4px 20px rgba(42, 37, 32, 0.15)",
        }}
      >
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <motion.div
              whileHover={{ rotate: -8, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-10 h-10 rounded-xl border-2 border-[#F5EFE6] flex items-center justify-center font-black text-base"
              style={{
                backgroundColor: "#D4A95F",
                color: "#2A2520",
              }}
            >
              N
            </motion.div>
            <div className="flex flex-col leading-none">
              <span
                className="text-lg font-black tracking-tight"
                style={{ fontFamily: '"Fraunces", Georgia, serif' }}
              >
                Notticks
              </span>
              <span className="text-[10px] opacity-60 tracking-widest uppercase">
                seu cantinho produtivo
              </span>
            </div>
          </div>

          {/* Separador */}
          <div className="hidden md:block w-px h-8 bg-[#F5EFE6]/20 mx-2" />

          {/* Botão Adicionar Tarefa */}
          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={abrirModalAdicao}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-[#F5EFE6] font-semibold text-sm transition-all"
            style={{
              backgroundColor: "#D4A95F",
              color: "#2A2520",
              boxShadow: "3px 3px 0 0 rgba(245, 239, 230, 0.3)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Nova tarefa
          </motion.button>
        </div>

        {/* Dropdown de Perfil — Ícone de usuário */}
        <div className="relative" ref={dropdownRef}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="relative flex items-center justify-center w-11 h-11 rounded-full border-2 border-[#F5EFE6] font-bold text-sm overflow-hidden"
            style={{
              backgroundColor: "#C97B63",
              color: "#F5EFE6",
            }}
            aria-label="Menu do usuário"
          >
            {iniciais}
            {/* Indicador de status */}
            <span
              className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#2A2520]"
              style={{ backgroundColor: "#8A9A7B" }}
            />
          </motion.button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.15, type: "spring", stiffness: 400 }}
                className="absolute right-0 mt-3 w-64 rounded-2xl border-2 border-[#2A2520] overflow-hidden z-50"
                style={{
                  backgroundColor: "#F5EFE6",
                  boxShadow: "8px 8px 0 0 #2A2520",
                  backdropFilter: "blur(10px)",
                }}
              >
                {/* Cabeçalho do dropdown */}
                <div
                  className="px-4 py-3 border-b-2 border-dashed border-[#2A2520]/20"
                  style={{ backgroundColor: "#E8DFD0" }}
                >
                  <p className="text-xs uppercase tracking-widest opacity-60 mb-0.5">
                    Conectado como
                  </p>
                  <p className="font-bold truncate" style={{ color: "#2A2520" }}>
                    {nome}
                  </p>
                  <p className="text-xs opacity-70 truncate">{username}</p>
                </div>

                {/* Opções */}
                <div className="py-1.5">
                  <button
                    onClick={Configuracoes}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-left hover:bg-[#E8DFD0] transition-colors"
                    style={{ color: "#2A2520" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 0 1 0 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 0 1 0-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    Configurações
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-left hover:bg-[#E8DFD0] transition-colors"
                    style={{ color: "#C97B63" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                      />
                    </svg>
                    Sair da conta
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 flex-1 px-6 md:px-10 py-8">
        {/* Doodle decorativo — xícara de café com vapor */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ delay: 0.5, duration: 1 }}
          aria-hidden
          className="absolute top-24 right-8 w-32 h-32 hidden lg:block pointer-events-none"
          viewBox="0 0 100 100"
          fill="none"
          stroke="#2A2520"
          strokeWidth="1.2"
          strokeLinecap="round"
        >
          <path d="M25 45 L25 72 Q25 82 35 82 L60 82 Q70 82 70 72 L70 45 Z" />
          <path d="M70 52 Q82 52 82 62 Q82 72 70 72" />
          <motion.path
            d="M38 35 Q40 28 38 22"
            animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.path
            d="M50 35 Q52 28 50 22"
            animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          />
          <motion.path
            d="M62 35 Q64 28 62 22"
            animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          />
        </motion.svg>

        {/* Doodle decorativo — folha */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          transition={{ delay: 0.7, duration: 1 }}
          aria-hidden
          className="absolute bottom-20 left-8 w-24 h-32 hidden lg:block pointer-events-none"
          viewBox="0 0 80 100"
          fill="none"
          stroke="#2A2520"
          strokeWidth="1.2"
          strokeLinecap="round"
        >
          <path d="M40 90 L40 50" />
          <path d="M40 75 Q20 70 15 55 Q25 60 40 65" />
          <path d="M40 65 Q60 60 65 45 Q55 50 40 55" />
          <path d="M40 55 Q25 45 20 30 Q30 35 40 45" />
        </motion.svg>

        {/* Título da seção */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 max-w-4xl"
        >
          <div className="flex items-center gap-2 mb-2">
            <span
              className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#2A2520]/20"
              style={{ backgroundColor: "#E8DFD0", color: "#6B4F3F" }}
            >
              ● suas tarefas
            </span>
            <span className="text-xs opacity-60">
              {tarefa.length} {tarefa.length === 1 ? "item" : "itens"}
            </span>
          </div>
          <h1
            className="text-3xl md:text-4xl font-black tracking-tight"
            style={{ fontFamily: '"Fraunces", Georgia, serif' }}
          >
            Olá, {nome.split(" ")[0]}.{" "}
            <span style={{ color: "#C97B63", fontStyle: "italic" }}>
              {tarefa.length === 0
                ? "Vamos começar?"
                : "O que temos para hoje?"}
            </span>
          </h1>
        </motion.div>

        {/* Botão mobile de adicionar */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={abrirModalAdicao}
          className="sm:hidden w-full mb-6 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-[#2A2520] font-semibold text-sm"
          style={{
            backgroundColor: "#D4A95F",
            color: "#2A2520",
            boxShadow: "4px 4px 0 0 #2A2520",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Adicionar nova tarefa
        </motion.button>

        {/* Lista de tarefas ou estado vazio */}
        {tarefa.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            {/* Ilustração de caderno vazio */}
            <div
              className="relative mb-6 p-8 rounded-3xl border-2 border-dashed border-[#2A2520]/30"
              style={{ backgroundColor: "#E8DFD0" }}
            >
              <svg
                className="w-24 h-24 opacity-60"
                viewBox="0 0 100 100"
                fill="none"
                stroke="#2A2520"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <rect
                  x="20"
                  y="15"
                  width="60"
                  height="70"
                  rx="4"
                  fill="#F5EFE6"
                />
                <line x1="30" y1="30" x2="70" y2="30" />
                <line x1="30" y1="45" x2="70" y2="45" />
                <line x1="30" y1="60" x2="55" y2="60" />
                <circle cx="75" cy="75" r="12" fill="#D4A95F" />
                <path d="M70 75 L75 80 L82 70" strokeWidth="2" />
              </svg>
            </div>
            <h2
              className="text-2xl md:text-3xl font-black mb-3 tracking-tight"
              style={{ fontFamily: '"Fraunces", Georgia, serif' }}
            >
              Parece que não há nada aqui.
            </h2>
            <p className="text-base opacity-70 max-w-md mb-6">
              Adicione uma nova tarefa e comece a organizar seu dia com calma.
            </p>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={abrirModalAdicao}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#2A2520] font-semibold"
              style={{
                backgroundColor: "#C97B63",
                color: "#F5EFE6",
                boxShadow: "5px 5px 0 0 #2A2520",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Criar minha primeira tarefa
            </motion.button>
          </motion.div>
        ) : (
          <div
            
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"> 
            <AnimatePresence mode="popLayout">
              {tarefa.map((t) => (
                <motion.div
                  key={t._id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="group relative rounded-2xl border-2 border-[#2A2520] p-4 flex flex-col overflow-hidden"
                  style={{
                    backgroundColor: "#FFFCF5",
                    boxShadow: "5px 5px 0 0 #2A2520",
                    minHeight: "180px",
                    maxHeight: "340px",
                  }}
                >
                  {/* Header do card */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3
                      className="text-lg font-bold leading-snug line-clamp-2 flex-1 break-words"
                      style={{ fontFamily: '"Fraunces", Georgia, serif' }}
                      title={t.titulo}
                    >
                      {t.titulo}
                    </h3>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => abrirModalEdicao(t)}
                        className="w-7 h-7 rounded-lg border border-[#2A2520]/40 flex items-center justify-center text-xs"
                        style={{ backgroundColor: "#D4A95F" }}
                        aria-label="Editar"
                        title="Editar"
                      >
                        ✎
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => deletarTarefa(t._id, e)}
                        className="w-7 h-7 rounded-lg border border-[#2A2520]/40 flex items-center justify-center text-xs"
                        style={{ backgroundColor: "#C97B63", color: "#F5EFE6" }}
                        aria-label="Excluir"
                        title="Excluir"
                      >
                        ✕
                      </motion.button>
                    </div>
                  </div>

                  {/* Corpo do card com scroll */}
                  <div className="flex-1 overflow-y-auto pr-1 space-y-2">
                    {t.descricao && (
                      <p
                        className="text-sm leading-relaxed text-[#4A4540] whitespace-pre-wrap break-words"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 6,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {t.descricao}
                      </p>
                    )}

                    {/* Tags */}
                    {t.tag && t.tag.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {t.tag.map((tagName, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded-full border border-[#2A2520]/30 font-semibold truncate max-w-[120px]"
                            style={{
                              backgroundColor:
                                coresDisponiveis[idx % coresDisponiveis.length]
                                  .hex + "30",
                              color: "#2A2520",
                            }}
                            title={tagName}
                          >
                            {tagName}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Checklist */}
                    {t.checklist && t.checklist.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        {t.checklist.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 text-sm"
                          >
                            <div
                              className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                                item.concluido
                                  ? "border-[#8A9A7B] bg-[#8A9A7B]"
                                  : "border-[#2A2520]/40"
                              }`}
                            >
                              {item.concluido && (
                                <svg
                                  className="w-2.5 h-2.5 text-[#F5EFE6]"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={3}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              )}
                            </div>
                            <span
                              className={`break-words leading-snug ${
                                item.concluido
                                  ? "line-through opacity-50"
                                  : "opacity-90"
                              }`}
                            >
                              {item.texto}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer do card */}
                  <div className="mt-3 pt-2 border-t border-dashed border-[#2A2520]/15 flex items-center justify-between text-[10px] opacity-60">
                    <span>
                      {t.checklist?.length || 0}{" "}
                      {(t.checklist?.length || 0) === 1 ? "item" : "itens"}
                    </span>
                    <span>
                      {t.tag?.length || 0}{" "}
                      {(t.tag?.length || 0) === 1 ? "tag" : "tags"}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* MODAL DE ADIÇÃO/EDIÇÃO */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              backgroundColor: "rgba(42, 37, 32, 0.6)",
              backdropFilter: "blur(4px)",
            }}
            onClick={fecharTodosModais}
          >
            <motion.form
              layout
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onSubmit={handleSubmit}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#F5EFE6] border-2 border-[#2A2520] w-full max-w-2xl rounded-3xl overflow-hidden"
              style={{ boxShadow: "12px 12px 0 0 #2A2520" }}
            >
              {/* Cabeçalho do modal */}
              <div
                className="px-6 py-4 border-b-2 border-[#2A2520] flex items-center justify-between"
                style={{ backgroundColor: "#2A2520", color: "#F5EFE6" }}
              >
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-60">
                    {tarefaEmEdicao ? "editando" : "nova entrada"}
                  </p>
                  <h2
                    className="text-xl font-black tracking-tight"
                    style={{ fontFamily: '"Fraunces", Georgia, serif' }}
                  >
                    {tarefaEmEdicao ? "Editar Tarefa" : "Nova Tarefa"}
                  </h2>
                </div>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={fecharTodosModais}
                  className="w-9 h-9 rounded-full border-2 border-[#F5EFE6] flex items-center justify-center font-bold"
                  style={{ backgroundColor: "transparent", color: "#F5EFE6" }}
                >
                  ✕
                </motion.button>
              </div>

              {/* Corpo do modal */}
              <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-70">
                    Título *
                  </label>
                  <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                    maxLength={100}
                    placeholder="O que precisa ser feito?"
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-[#2A2520]/30 bg-[#FFFCF5] focus:outline-none focus:border-[#C97B63] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-70">
                    Descrição
                  </label>
                  <textarea
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    maxLength={1000}
                    rows={4}
                    placeholder="Detalhes, contexto, lembretes..."
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-[#2A2520]/30 bg-[#FFFCF5] focus:outline-none focus:border-[#C97B63] transition-colors resize-none"
                  />
                </div>

                {/* Botões de ação */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsTagModalOpen(true)}
                    className="py-2.5 rounded-xl border-2 border-[#2A2520] font-semibold text-sm flex items-center justify-center gap-2"
                    style={{ backgroundColor: "#E8DFD0" }}
                  >
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: "#C97B63" }}
                    />
                    Tags {tag.length > 0 && `(${tag.length})`}
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsChecklistModalOpen(true)}
                    className="py-2.5 rounded-xl border-2 border-[#2A2520] font-semibold text-sm flex items-center justify-center gap-2"
                    style={{ backgroundColor: "#E8DFD0" }}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                    Checklist {checklist.length > 0 && `(${checklist.length})`}
                  </motion.button>
                </div>

                {/* Preview de tags */}
                {tag.length > 0 && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-70">
                      Tags adicionadas
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {tag.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-3 py-1 rounded-full border border-[#2A2520]/30 font-semibold flex items-center gap-1.5"
                          style={{
                            backgroundColor:
                              coresDisponiveis[idx % coresDisponiveis.length]
                                .hex + "40",
                          }}
                        >
                          {t}
                          <button
                            type="button"
                            onClick={() =>
                              setTag(tag.filter((_, i) => i !== idx))
                            }
                            className="opacity-60 hover:opacity-100"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Preview de checklist */}
                {checklist.length > 0 && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-70">
                      Checklist
                    </label>
                    <div className="space-y-1.5 max-h-40 overflow-y-auto">
                      {checklist.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm p-2 rounded-lg"
                          style={{ backgroundColor: "#E8DFD0" }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8A9A7B] flex-shrink-0" />
                          <span className="truncate">{item.texto}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer do modal */}
              <div
                className="px-6 py-4 border-t-2 border-[#2A2520] flex gap-3"
                style={{ backgroundColor: "#E8DFD0" }}
              >
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={fecharTodosModais}
                  className="flex-1 py-2.5 rounded-xl border-2 border-[#2A2520] font-semibold text-sm"
                  style={{ backgroundColor: "#F5EFE6" }}
                >
                  Cancelar
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-2.5 rounded-xl border-2 border-[#2A2520] font-bold text-sm flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: "#C97B63",
                    color: "#F5EFE6",
                    boxShadow: "3px 3px 0 0 #2A2520",
                  }}
                >
                  {tarefaEmEdicao ? "Salvar alterações" : "Criar tarefa"}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL DE TAG */}
      <AnimatePresence>
        {isTagModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            style={{
              backgroundColor: "rgba(42, 37, 32, 0.5)",
              backdropFilter: "blur(4px)",
            }}
            onClick={() => setIsTagModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="bg-[#F5EFE6] border-2 border-[#2A2520] w-full max-w-md rounded-3xl overflow-hidden"
              style={{ boxShadow: "10px 10px 0 0 #2A2520" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="px-5 py-4 border-b-2 border-[#2A2520] flex items-center justify-between"
                style={{ backgroundColor: "#C97B63", color: "#F5EFE6" }}
              >
                <h3
                  className="text-lg font-black tracking-tight"
                  style={{ fontFamily: '"Fraunces", Georgia, serif' }}
                >
                  Nova Tag
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsTagModalOpen(false)}
                  className="w-8 h-8 rounded-full border-2 border-[#F5EFE6] flex items-center justify-center font-bold"
                >
                  ✕
                </motion.button>
              </div>

              <div className="p-5 space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-70">
                    Nome da tag *
                  </label>
                  <input
                    type="text"
                    value={novaTag}
                    onChange={(e) => setNovaTag(e.target.value)}
                    placeholder="Ex: Urgente, Pessoal, Leitura..."
                    maxLength={50}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-[#2A2520]/30 bg-[#FFFCF5] focus:outline-none focus:border-[#C97B63] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-70">
                    Escolha uma cor
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {coresDisponiveis.map((cor) => (
                      <motion.button
                        key={cor.hex}
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCorTag(cor.hex)}
                        className={`aspect-square rounded-xl border-2 flex items-center justify-center transition-all ${
                          corTag === cor.hex
                            ? "border-[#2A2520] scale-110"
                            : "border-[#2A2520]/30"
                        }`}
                        style={{ backgroundColor: cor.hex }}
                        aria-label={cor.nome}
                        title={cor.nome}
                      >
                        {corTag === cor.hex && (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke={
                              cor.hex === "#E8DFD0" ? "#2A2520" : "#F5EFE6"
                            }
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m4.5 12.75 6 6 9-13.5"
                            />
                          </svg>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                {novaTag.trim() && (
                  <div className="pt-2">
                    <p className="text-xs opacity-60 mb-2">Pré-visualização:</p>
                    <span
                      className="inline-block text-sm px-3 py-1 rounded-full border border-[#2A2520]/30 font-semibold"
                      style={{ backgroundColor: corTag + "40" }}
                    >
                      {novaTag}
                    </span>
                  </div>
                )}
              </div>

              <div
                className="px-5 py-4 border-t-2 border-[#2A2520]"
                style={{ backgroundColor: "#E8DFD0" }}
              >
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAdicionarTag}
                  disabled={!novaTag.trim()}
                  className="w-full py-2.5 rounded-xl border-2 border-[#2A2520] font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "#D4A95F",
                    color: "#2A2520",
                    boxShadow: "3px 3px 0 0 #2A2520",
                  }}
                >
                  Adicionar tag
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL DE CHECKLIST */}
      <AnimatePresence>
        {isChecklistModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            style={{
              backgroundColor: "rgba(42, 37, 32, 0.5)",
              backdropFilter: "blur(4px)",
            }}
            onClick={() => setIsChecklistModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="bg-[#F5EFE6] border-2 border-[#2A2520] w-full max-w-md rounded-3xl overflow-hidden"
              style={{ boxShadow: "10px 10px 0 0 #2A2520" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="px-5 py-4 border-b-2 border-[#2A2520] flex items-center justify-between"
                style={{ backgroundColor: "#8A9A7B", color: "#F5EFE6" }}
              >
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-70">
                    passos da tarefa
                  </p>
                  <h3
                    className="text-lg font-black tracking-tight"
                    style={{ fontFamily: '"Fraunces", Georgia, serif' }}
                  >
                    Checklist
                  </h3>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsChecklistModalOpen(false)}
                  className="w-8 h-8 rounded-full border-2 border-[#F5EFE6] flex items-center justify-center font-bold"
                >
                  ✕
                </motion.button>
              </div>

              <div className="p-5">
                <div className="space-y-2 max-h-80 overflow-y-auto pr-1 mb-3">
                  {itensChecklist.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex gap-2"
                    >
                      <div
                        className="w-8 h-10 rounded-lg border-2 border-[#2A2520]/30 flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ backgroundColor: "#E8DFD0" }}
                      >
                        {index + 1}
                      </div>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          atualizarItemChecklist(index, e.target.value)
                        }
                        placeholder={`Item ${index + 1}`}
                        maxLength={200}
                        className="flex-1 px-3 py-2 rounded-lg border-2 border-[#2A2520]/30 bg-[#FFFCF5] focus:outline-none focus:border-[#8A9A7B] transition-colors text-sm"
                      />
                      {itensChecklist.length > 1 && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removerItemChecklist(index)}
                          className="w-10 h-10 rounded-lg border-2 border-[#2A2520]/30 flex items-center justify-center font-bold flex-shrink-0"
                          style={{
                            backgroundColor: "#C97B63",
                            color: "#F5EFE6",
                          }}
                        >
                          ×
                        </motion.button>
                      )}
                    </motion.div>
                  ))}
                </div>

                {itensChecklist.length < 15 && (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={adicionarItemChecklist}
                    className="w-full py-2 rounded-xl border-2 border-dashed border-[#2A2520]/40 text-sm font-semibold flex items-center justify-center gap-2 hover:border-[#2A2520] transition-colors"
                  >
                    <span className="text-lg leading-none">+</span>
                    Adicionar item ({itensChecklist.length}/15)
                  </motion.button>
                )}
              </div>

              <div
                className="px-5 py-4 border-t-2 border-[#2A2520]"
                style={{ backgroundColor: "#E8DFD0" }}
              >
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={salvarChecklist}
                  className="w-full py-2.5 rounded-xl border-2 border-[#2A2520] font-bold text-sm"
                  style={{
                    backgroundColor: "#8A9A7B",
                    color: "#F5EFE6",
                    boxShadow: "3px 3px 0 0 #2A2520",
                  }}
                >
                  Salvar checklist
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ALERTA DE LIMITE */}
      <AnimatePresence>
        {showLimitAlert && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md rounded-2xl border-2 border-[#2A2520] overflow-hidden"
            style={{
              backgroundColor: "#F5EFE6",
              boxShadow: "8px 8px 0 0 #2A2520",
            }}
          >
            <div
              className="px-5 py-3 border-b-2 border-[#2A2520] flex items-center gap-3"
              style={{ backgroundColor: "#C97B63", color: "#F5EFE6" }}
            >
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
              <p className="font-bold text-sm">Limite atingido</p>
            </div>
            <div className="p-5">
              <p className="font-semibold mb-1">
                Ops, você atingiu o limite de tarefas.
              </p>
              <p className="text-sm opacity-70 mb-4">
                Exclua pelo menos uma para continuar adicionando.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowLimitAlert(false)}
                className="w-full py-2.5 rounded-xl border-2 border-[#2A2520] font-bold text-sm"
                style={{
                  backgroundColor: "#2A2520",
                  color: "#F5EFE6",
                }}
              >
                Ok, entendi
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}