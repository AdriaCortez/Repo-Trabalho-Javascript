"use client";

import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";

type Props = {
  nome: string;
  username: string;
  email: string;
  senha: string;
  setNome: Dispatch<SetStateAction<string>>;
  setUsername: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setSenha: Dispatch<SetStateAction<string>>;
  DesativarConta: () => Promise<void>;
};

export default function PerfilView({
  nome,
  username,
  email,
  senha,
  setSenha,
  DesativarConta,
}: Props) {
  const navigate = useNavigate();

  // Modais
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Fechar todos os modais
  const fecharTodosModais = () => {
    setIsConfigModalOpen(false);
    setIsConfirmModalOpen(false);
    setIsAuthModalOpen(false);
    setSenha("");
  };

  // Voltar para tarefas
  const Voltar = () => {
    navigate("/tarefas");
  };

  // Trocar senha
  const handleTrocarSenha = () => {
    fecharTodosModais();
    navigate("/trocar-senha");
  };

  // Fluxo de desativação
  const handleDesativarClick = () => {
    setIsConfigModalOpen(false);
    setIsConfirmModalOpen(true);
  };

  const handleProsseguir = () => {
    setIsConfirmModalOpen(false);
    setIsAuthModalOpen(true);
  };

  const handleCancelarConfirm = () => {
    setIsConfirmModalOpen(false);
  };

  const handleDesativarConfirm = () => {
    if (!senha.trim()) {
      alert("Por favor, insira sua senha.");
      return;
    }
    DesativarConta();
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

      {/* HEADER */}
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
        </div>

        {/* Botão Voltar */}
        <motion.button
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
          onClick={Voltar}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-[#F5EFE6] font-semibold text-sm transition-all"
          style={{
            backgroundColor: "transparent",
            color: "#F5EFE6",
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
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Voltar
        </motion.button>
      </motion.header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
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

        {/* Card central do usuário */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="relative w-full max-w-md rounded-3xl border-2 border-[#2A2520] overflow-hidden"
          style={{
            backgroundColor: "#FFFCF5",
            boxShadow: "10px 10px 0 0 #2A2520",
          }}
        >
          {/* Cabeçalho do card */}
          <div
            className="px-6 py-5 border-b-2 border-[#2A2520] flex flex-col items-center text-center"
            style={{ backgroundColor: "#E8DFD0" }}
          >
            {/* Avatar com iniciais */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-24 h-24 rounded-full border-4 border-[#2A2520] flex items-center justify-center font-black text-3xl mb-4"
              style={{
                backgroundColor: "#C97B63",
                color: "#F5EFE6",
                boxShadow: "4px 4px 0 0 #2A2520",
              }}
            >
              {iniciais}
            </motion.div>

            {/* Nome destacado */}
            <h1
              className="text-2xl md:text-3xl font-black tracking-tight mb-2"
              style={{
                fontFamily: '"Fraunces", Georgia, serif',
                color: "#2A2520",
              }}
            >
              {nome}
            </h1>

            {/* Username e email lado a lado */}
            <div className="flex items-center gap-2 text-sm opacity-75 flex-wrap justify-center">
              <span className="font-semibold truncate">{username}</span>
              <span className="opacity-40">|</span>
              <span className="truncate">{email}</span>
            </div>
          </div>

          {/* Corpo do card */}
          <div className="p-6">
            <p className="text-xs uppercase tracking-widest opacity-60 mb-3 text-center">
              Gerenciar conta
            </p>

            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsConfigModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-[#2A2520] font-bold text-sm transition-all"
              style={{
                backgroundColor: "#2A2520",
                color: "#F5EFE6",
                boxShadow: "4px 4px 0 0 #C97B63",
              }}
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
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 0 1 0 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 0 1 0-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              Configurações
            </motion.button>
          </div>
        </motion.div>
      </main>

      {/* MODAL DE CONFIGURAÇÕES */}
      <AnimatePresence>
        {isConfigModalOpen && (
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
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="bg-[#F5EFE6] border-2 border-[#2A2520] w-full max-w-md rounded-3xl overflow-hidden"
              style={{ boxShadow: "10px 10px 0 0 #2A2520" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cabeçalho */}
              <div
                className="px-6 py-4 border-b-2 border-[#2A2520] flex items-center justify-between"
                style={{ backgroundColor: "#2A2520", color: "#F5EFE6" }}
              >
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-60">
                    conta
                  </p>
                  <h2
                    className="text-xl font-black tracking-tight"
                    style={{ fontFamily: '"Fraunces", Georgia, serif' }}
                  >
                    Configurações
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

              {/* Opções */}
              <div className="p-5 space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleTrocarSenha}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-[#2A2520] font-semibold text-sm text-left transition-all"
                  style={{
                    backgroundColor: "#FFFCF5",
                    color: "#2A2520",
                    boxShadow: "3px 3px 0 0 #2A2520",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg border-2 border-[#2A2520] flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#D4A95F" }}
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
                        d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold">Trocar senha</p>
                    <p className="text-xs opacity-60">
                      Atualize sua senha de acesso
                    </p>
                  </div>
                  <svg
                    className="w-4 h-4 opacity-50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDesativarClick}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-[#2A2520] font-semibold text-sm text-left transition-all"
                  style={{
                    backgroundColor: "#FFFCF5",
                    color: "#C97B63",
                    boxShadow: "3px 3px 0 0 #2A2520",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg border-2 border-[#2A2520] flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#C97B63", color: "#F5EFE6" }}
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
                        d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold">Desativar conta</p>
                    <p className="text-xs opacity-60">
                      Pausar sua conta temporariamente
                    </p>
                  </div>
                  <svg
                    className="w-4 h-4 opacity-50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL DE CONFIRMAÇÃO — Desativar conta */}
      <AnimatePresence>
        {isConfirmModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex items-center justify-center p-4"
            style={{
              backgroundColor: "rgba(42, 37, 32, 0.6)",
              backdropFilter: "blur(4px)",
            }}
            onClick={handleCancelarConfirm}
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
              {/* Cabeçalho */}
              <div
                className="px-6 py-4 border-b-2 border-[#2A2520] flex items-center gap-3"
                style={{ backgroundColor: "#C97B63", color: "#F5EFE6" }}
              >
                <svg
                  className="w-6 h-6 shrink-0"
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
                <h3
                  className="text-lg font-black tracking-tight"
                  style={{ fontFamily: '"Fraunces", Georgia, serif' }}
                >
                  Atenção
                </h3>
              </div>

              {/* Corpo */}
              <div className="p-6">
                <p className="text-sm leading-relaxed mb-1">
                  Você tem certeza que deseja desativar a conta?
                </p>
                <p className="text-sm leading-relaxed opacity-80">
                  Ela pode ser reativada posteriormente, entretanto você não
                  terá acesso à nenhuma funcionalidade da aplicação.
                </p>
              </div>

              {/* Footer */}
              <div
                className="px-6 py-4 border-t-2 border-[#2A2520] flex gap-3"
                style={{ backgroundColor: "#E8DFD0" }}
              >
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCancelarConfirm}
                  className="flex-1 py-2.5 rounded-xl border-2 border-[#2A2520] font-semibold text-sm"
                  style={{ backgroundColor: "#F5EFE6" }}
                >
                  Cancelar
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleProsseguir}
                  className="flex-1 py-2.5 rounded-xl border-2 border-[#2A2520] font-bold text-sm flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: "#C97B63",
                    color: "#F5EFE6",
                    boxShadow: "3px 3px 0 0 #2A2520",
                  }}
                >
                  Prosseguir
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL DE AUTENTICAÇÃO — Inserir senha */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-70 flex items-center justify-center p-4"
            style={{
              backgroundColor: "rgba(42, 37, 32, 0.6)",
              backdropFilter: "blur(4px)",
            }}
            onClick={fecharTodosModais}
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
              {/* Cabeçalho */}
              <div
                className="px-6 py-4 border-b-2 border-[#2A2520] flex items-center justify-between"
                style={{ backgroundColor: "#2A2520", color: "#F5EFE6" }}
              >
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-60">
                    verificação
                  </p>
                  <h2
                    className="text-xl font-black tracking-tight"
                    style={{ fontFamily: '"Fraunces", Georgia, serif' }}
                  >
                    Autenticação
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

              {/* Corpo */}
              <div className="p-6 space-y-5">
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-xl border-2 border-[#2A2520] flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "#D4A95F" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm leading-relaxed opacity-85">
                    Por razões de segurança, você deve inserir sua senha para
                    desativar a conta.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-70">
                    Senha *
                  </label>
                  <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Digite sua senha atual"
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-[#2A2520]/30 bg-[#FFFCF5] focus:outline-none focus:border-[#C97B63] transition-colors"
                  />
                </div>
              </div>

              {/* Footer */}
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
                  type="button"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDesativarConfirm}
                  disabled={!senha.trim()}
                  className="flex-1 py-2.5 rounded-xl border-2 border-[#2A2520] font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "#C97B63",
                    color: "#F5EFE6",
                    boxShadow: "3px 3px 0 0 #2A2520",
                  }}
                >
                  Desativar
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
                      d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                    />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
