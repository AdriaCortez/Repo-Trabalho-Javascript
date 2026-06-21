// ~/View/tarefas.view.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
}: Props) 


{

  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);
  const [novaTag, setNovaTag] = useState("");
  const [corTag, setCorTag] = useState("#F4A5B0"); // Cor padrão vermelha
  const [itensChecklist, setItensChecklist] = useState<string[]>([""]);
  const [showLimitAlert, setShowLimitAlert] = useState(false);

  // Estado para edição
  const [tarefaEmEdicao, setTarefaEmEdicao] = useState<string | null>(null);

  // Cores disponíveis para tags
  const coresDisponiveis = ["#F4A5B0", "#6B5B95", "#F2C14E", "#5B8DB8"];

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
    setCorTag("#F4A5B0");
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
      .map((item) => ({ texto: item.trim(), feito: false }));
    setChecklist(checklistValida);
    setIsChecklistModalOpen(false);
  };

  // Logout
  const handleLogout = () => {
    fetch("http://localhost:4000/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      navigate("/login");
    });
  };

  // Navegar para configurações
  const handleConfiguracoes = () => {
    navigate("/configuracoes");
  };

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        backgroundColor: "#FAF6EF",
        color: "#2A2520",
        fontFamily: '"Inter", system-ui, sans-serif',
      }}
    >
      {/* Glow decorativo de fundo */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] blur-[160px] opacity-30 rounded-full"
        style={{
          background:
            "radial-gradient(circle, #F4A5B0 0%, #6B5B95 40%, #5B8DB8 70%, transparent 100%)",
        }}
      />

      {/* Textura sutil */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.04] z-0"
        style={{
          backgroundImage: "radial-gradient(#2A2520 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />

      {/* HEADER */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 px-6 md:px-12 py-6 flex items-center justify-between border-b-2 border-[#2A2520]"
      >
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={abrirModalAdicao}
            className="group inline-flex items-center gap-2 px-4 py-2 border-2 border-[#2A2520] font-bold text-sm"
            style={{
              backgroundColor: "#6B5B95",
              color: "#FAF6EF",
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
        </div>

        {/* Dropdown de Perfil */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2 border-2 border-[#2A2520] font-medium flex items-center gap-2"
            style={{ backgroundColor: "#FAF6EF" }}
          >
            Olá, {nome.split(" ")[0]}!
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
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </motion.button>
          {/* Dropdown Menu */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-[#FAF6EF] border-2 border-[#2A2520] shadow-[4px_4px_0_0_#2A2520] z-20"
          >
            <button
              onClick={handleConfiguracoes}
              className="block w-full text-left px-4 py-2 hover:bg-[#F3EEE3] border-b border-[#2A2520] last:border-b-0"
            >
              Configurações
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-[#F3EEE3]"
            >
              Logout
            </button>
          </motion.div>
        </div>
      </motion.header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 flex-1 p-6 md:p-12">
        {tarefa.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full flex flex-col items-center justify-center text-center"
          >
            <motion.h2
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="text-3xl md:text-4xl font-black mb-4"
              style={{ fontFamily: '"Fraunces", Georgia, serif' }}
            >
              Parece que não há nada aqui.
            </motion.h2>
            <motion.p
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg max-w-md"
            >
              Adicione uma nova tarefa!
            </motion.p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tarefa.map((t) => (
              <motion.div
                key={t._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="border-2 border-[#2A2520] p-4 flex flex-col"
                style={{
                  backgroundColor: "#FFFDF7",
                  boxShadow: "6px 6px 0 0 #2A2520",
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3
                    className="text-xl font-black flex-1 mr-2"
                    style={{ fontFamily: '"Fraunces", Georgia, serif' }}
                  >
                    {t.titulo}
                  </h3>
                  <div className="flex gap-1">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => abrirModalEdicao(t)}
                      className="p-1 border border-[#2A2520]"
                      style={{ backgroundColor: "#F2C14E" }}
                      aria-label="Editar"
                    >
                      ✎
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => deletarTarefa(t._id, e)}
                      className="p-1 border border-[#2A2520]"
                      style={{ backgroundColor: "#F4A5B0" }}
                      aria-label="Excluir"
                    >
                      ✕
                    </motion.button>
                  </div>
                </div>
                {t.descricao && (
                  <p className="text-sm mb-3 text-[#4A4540] flex-1">
                    {t.descricao}
                  </p>
                )}
                {t.tag && t.tag.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {t.tag.map((tagName, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-0.5 border border-[#2A2520] font-medium"
                        style={{ backgroundColor: coresDisponiveis[idx % coresDisponiveis.length] }}
                      >
                        {tagName}
                      </span>
                    ))}
                  </div>
                )}
                {t.checklist && t.checklist.length > 0 && (
                  <div className="space-y-1">
                    {t.checklist.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked={item.feito}
                          readOnly
                          className="mt-1 accent-[#6B5B95]"
                        />
                        <span
                          className={`text-sm ${item.feito ? "line-through text-[#A8A29A]" : ""}`}
                        >
                          {item.texto}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
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
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={fecharTodosModais}
          >
            <motion.form
              layout
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring" }}
              onSubmit={handleSubmit}
              className="bg-[#FAF6EF] border-2 border-[#2A2520] w-full max-w-2xl p-6 relative"
              style={{ boxShadow: "10px 10px 0 0 #2A2520" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={fecharTodosModais}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border-2 border-[#2A2520] font-bold"
                style={{ backgroundColor: "#FFFDF7" }}
              >
                ✕
              </button>
              <h2 className="text-2xl font-black mb-6" style={{ fontFamily: '"Fraunces", Georgia, serif' }}>
                {tarefaEmEdicao ? "Editar Tarefa" : "Nova Tarefa"}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Título *</label>
                  <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                    maxLength={100}
                    className="w-full p-2 border-2 border-[#2A2520] bg-[#FFFDF7]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Descrição</label>
                  <textarea
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    maxLength={1000}
                    rows={3}
                    className="w-full p-2 border-2 border-[#2A2520] bg-[#FFFDF7]"
                  />
                </div>
                <div className="flex gap-3">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setIsTagModalOpen(true)}
                    className="flex-1 py-2 border-2 border-[#2A2520] font-medium"
                    style={{ backgroundColor: "#F4A5B0" }}
                  >
                    + Adicionar Tag
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setIsChecklistModalOpen(true)}
                    className="flex-1 py-2 border-2 border-[#2A2520] font-medium"
                    style={{ backgroundColor: "#5B8DB8" }}
                  >
                    + Criar Checklist
                  </motion.button>
                </div>
                {tag.length > 0 && (
                  <div>
                    <label className="block text-sm font-bold mb-1">Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {tag.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 border border-[#2A2520] font-medium"
                          style={{ backgroundColor: coresDisponiveis[idx % coresDisponiveis.length] }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {checklist.length > 0 && (
                  <div>
                    <label className="block text-sm font-bold mb-1">Checklist</label>
                    <div className="space-y-1">
                      {checklist.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-sm">{item.texto}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-6 w-full py-3 border-2 border-[#2A2520] font-bold text-lg"
                style={{
                  backgroundColor: "#6B5B95",
                  color: "#FAF6EF",
                  boxShadow: "4px 4px 0 0 #2A2520",
                }}
              >
                {tarefaEmEdicao ? "Atualizar" : "Criar Tarefa"}
              </motion.button>
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
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setIsTagModalOpen(false)}
          >
            <motion.div
              layout
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring" }}
              className="bg-[#FAF6EF] border-2 border-[#2A2520] w-full max-w-md p-6 relative"
              style={{ boxShadow: "10px 10px 0 0 #2A2520" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsTagModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border-2 border-[#2A2520] font-bold"
                style={{ backgroundColor: "#FFFDF7" }}
              >
                ✕
              </button>
              <h3 className="text-xl font-black mb-4" style={{ fontFamily: '"Fraunces", Georgia, serif' }}>
                Nova Tag
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Nome da Tag *</label>
                  <input
                    type="text"
                    value={novaTag}
                    onChange={(e) => setNovaTag(e.target.value)}
                    placeholder="Ex: Importante"
                    maxLength={50}
                    className="w-full p-2 border-2 border-[#2A2520] bg-[#FFFDF7]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Cor</label>
                  <div className="flex gap-2">
                    {coresDisponiveis.map((cor) => (
                      <motion.button
                        key={cor}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCorTag(cor)}
                        className="w-8 h-8 rounded-full border-2 border-[#2A2520]"
                        style={{ backgroundColor: cor }}
                        aria-label={`Cor ${cor}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAdicionarTag}
                disabled={!novaTag.trim()}
                className="mt-6 w-full py-2 border-2 border-[#2A2520] font-bold"
                style={{
                  backgroundColor: "#F2C14E",
                  color: "#2A2520",
                  boxShadow: "4px 4px 0 0 #2A2520",
                }}
              >
                Salvar Tag
              </motion.button>
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
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setIsChecklistModalOpen(false)}
          >
            <motion.div
              layout
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring" }}
              className="bg-[#FAF6EF] border-2 border-[#2A2520] w-full max-w-md p-6 relative"
              style={{ boxShadow: "10px 10px 0 0 #2A2520" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsChecklistModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border-2 border-[#2A2520] font-bold"
                style={{ backgroundColor: "#FFFDF7" }}
              >
                ✕
              </button>
              <h3 className="text-xl font-black mb-4" style={{ fontFamily: '"Fraunces", Georgia, serif' }}>
                Nova Checklist
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {itensChecklist.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => atualizarItemChecklist(index, e.target.value)}
                      placeholder={`Item ${index + 1}`}
                      maxLength={200}
                      className="flex-1 p-2 border-2 border-[#2A2520] bg-[#FFFDF7]"
                    />
                    {itensChecklist.length > 1 && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removerItemChecklist(index)}
                        className="w-10 flex items-center justify-center border-2 border-[#2A2520] font-bold"
                        style={{ backgroundColor: "#F4A5B0" }}
                      >
                        -
                      </motion.button>
                    )}
                  </div>
                ))}
                {itensChecklist.length < 15 && (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={adicionarItemChecklist}
                    className="flex items-center gap-2 text-sm font-bold py-2 px-4 border-2 border-[#2A2520]"
                    style={{ backgroundColor: "#5B8DB8", color: "#FAF6EF" }}
                  >
                    + Adicionar item
                  </motion.button>
                )}
              </div>
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={salvarChecklist}
                className="mt-6 w-full py-2 border-2 border-[#2A2520] font-bold"
                style={{
                  backgroundColor: "#6B5B95",
                  color: "#FAF6EF",
                  boxShadow: "4px 4px 0 0 #2A2520",
                }}
              >
                Salvar Checklist
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ALERTA DE LIMITE */}
      <AnimatePresence>
        {showLimitAlert && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-[#FAF6EF] border-2 border-[#2A2520] p-4 z-50"
            style={{ boxShadow: "4px 4px 0 0 #2A2520" }}
          >
            <p className="font-bold mb-2">Ops, você atingiu o limite de tarefas.</p>
            <p className="mb-3">Exclua pelo menos uma!</p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowLimitAlert(false)}
              className="w-full py-2 border-2 border-[#2A2520] font-bold"
              style={{ backgroundColor: "#F2C14E" }}
            >
              Ok, entendi
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}