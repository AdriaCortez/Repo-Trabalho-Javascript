"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";

type Props = {
  user: any;
  setUser: (user: any) => void;
  senha: string;
  setSenha: (senha: string) => void;
  nome: string;
  setNome: (nome: string) => void;
  username: string;
  setUsername: (username: string) => void;
  Reativar: () => void;
  Logout: () => void;
};

export default function ContaDesativadaView({
  user,
  setUser,
  senha,
  setSenha,
  nome,
  setNome,
  username,
  setUsername,
  Reativar,
  Logout,
}: Props) {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Fechar modal
  const fecharModal = () => {
    setIsAuthModalOpen(false);
    setSenha("");
  };

  // Abrir modal de autenticação
  const handleReativarClick = () => {
    setIsAuthModalOpen(true);
  };

  // Confirmar reativação
  const handleReativarConfirm = () => {
    if (!senha.trim()) {
      alert("Por favor, insira sua senha.");
      return;
    }
    Reativar();
  };

  // Sair
  const handleSair = () => {
    Logout();
  };

  // Iniciais do usuário para o avatar
  const iniciais = nome
    ? nome
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : username
      ? username.replace("@", "").slice(0, 2).toUpperCase()
      : "?";

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundColor: "#1A1614",
        color: "#F5EFE6",
        fontFamily: '"Inter", system-ui, sans-serif',
      }}
    >
      {/* Textura de papel sutil */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.03] z-0"
        style={{
          backgroundImage:
            "radial-gradient(#F5EFE6 1px, transparent 1px), radial-gradient(#F5EFE6 1px, transparent 1px)",
          backgroundSize: "20px 20px, 40px 40px",
          backgroundPosition: "0 0, 10px 10px",
        }}
      />

      {/* HEADER — Tom ainda mais escuro */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-30 px-6 md:px-10 py-5 flex items-center justify-center border-b-2 border-[#F5EFE6]/20"
        style={{
          backgroundColor: "#0F0D0B",
          color: "#F5EFE6",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div className="flex items-center gap-3">
          {/* Ícone de alerta */}
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="w-10 h-10 rounded-xl border-2 border-[#F5EFE6] flex items-center justify-center"
            style={{
              backgroundColor: "#C97B63",
              color: "#F5EFE6",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
          </motion.div>

          {/* Título */}
          <h1
            className="text-xl md:text-2xl font-black tracking-tight"
            style={{ fontFamily: '"Fraunces", Georgia, serif' }}
          >
            Opa! Parece que essa conta foi{" "}
            <span style={{ color: "#C97B63" }}>DESATIVADA</span>
          </h1>
        </div>
      </motion.header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        {/* Doodle decorativo — xícara de café com vapor (adaptado para tema escuro) */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 0.5, duration: 1 }}
          aria-hidden
          className="absolute top-24 right-8 w-32 h-32 hidden lg:block pointer-events-none"
          viewBox="0 0 100 100"
          fill="none"
          stroke="#F5EFE6"
          strokeWidth="1.2"
          strokeLinecap="round"
        >
          <path d="M25 45 L25 72 Q25 82 35 82 L60 82 Q70 82 70 72 L70 45 Z" />
          <path d="M70 52 Q82 52 82 62 Q82 72 70 72" />
          <motion.path
            d="M38 35 Q40 28 38 22"
            animate={{ y: [0, -3, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.path
            d="M50 35 Q52 28 50 22"
            animate={{ y: [0, -3, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          />
          <motion.path
            d="M62 35 Q64 28 62 22"
            animate={{ y: [0, -3, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          />
        </motion.svg>

        {/* Doodle decorativo — folha */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ delay: 0.7, duration: 1 }}
          aria-hidden
          className="absolute bottom-20 left-8 w-24 h-32 hidden lg:block pointer-events-none"
          viewBox="0 0 80 100"
          fill="none"
          stroke="#F5EFE6"
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
          className="relative w-full max-w-md rounded-3xl border-2 border-[#F5EFE6]/30 overflow-hidden"
          style={{
            backgroundColor: "#2A2520",
            boxShadow: "10px 10px 0 0 rgba(201, 123, 99, 0.3)",
          }}
        >
          {/* Cabeçalho do card */}
          <div
            className="px-6 py-5 border-b-2 border-[#F5EFE6]/20 flex flex-col items-center text-center"
            style={{ backgroundColor: "#1A1614" }}
          >
            {/* Avatar com iniciais */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-24 h-24 rounded-full border-4 border-[#F5EFE6]/40 flex items-center justify-center font-black text-3xl mb-4"
              style={{
                backgroundColor: "#C97B63",
                color: "#F5EFE6",
                boxShadow: "4px 4px 0 0 rgba(0, 0, 0, 0.5)",
              }}
            >
              {iniciais}
            </motion.div>

            {/* Nome */}
            {nome && (
              <h2
                className="text-2xl md:text-3xl font-black tracking-tight mb-2"
                style={{
                  fontFamily: '"Fraunces", Georgia, serif',
                  color: "#F5EFE6",
                }}
              >
                {nome}
              </h2>
            )}

            {/* Username */}
            {username && (
              <div className="flex items-center gap-2 text-sm opacity-75">
                <span className="font-semibold truncate">{username}</span>
              </div>
            )}
          </div>

          {/* Corpo do card */}
          <div className="p-6 space-y-4">
            {/* Mensagem informativa */}
            <div
              className="p-4 rounded-xl border-2 border-[#F5EFE6]/20"
              style={{ backgroundColor: "#1A1614" }}
            >
              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                  style={{ color: "#D4A95F" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
                <p className="text-sm leading-relaxed opacity-80">
                  Sua conta foi desativada. Você pode reativá-la a qualquer
                  momento ou sair da sessão.
                </p>
              </div>
            </div>

            {/* Botões */}
            <div className="space-y-3">
              {/* Botão Reativar Conta */}
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReativarClick}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-[#F5EFE6]/40 font-bold text-sm transition-all"
                style={{
                  backgroundColor: "#C97B63",
                  color: "#F5EFE6",
                  boxShadow: "4px 4px 0 0 rgba(0, 0, 0, 0.5)",
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
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
                Reativar conta
              </motion.button>

              {/* Botão Sair */}
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSair}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-[#F5EFE6]/40 font-bold text-sm transition-all"
                style={{
                  backgroundColor: "transparent",
                  color: "#F5EFE6",
                  borderColor: "#F5EFE6/40",
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
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>
                Sair
              </motion.button>
            </div>
          </div>
        </motion.div>
      </main>

      {/* MODAL DE AUTENTICAÇÃO */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(4px)",
            }}
            onClick={fecharModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="border-2 border-[#F5EFE6]/30 w-full max-w-md rounded-3xl overflow-hidden"
              style={{
                backgroundColor: "#2A2520",
                boxShadow: "10px 10px 0 0 rgba(201, 123, 99, 0.3)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cabeçalho */}
              <div
                className="px-6 py-4 border-b-2 border-[#F5EFE6]/20 flex items-center justify-between"
                style={{ backgroundColor: "#1A1614", color: "#F5EFE6" }}
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
                  onClick={fecharModal}
                  className="w-9 h-9 rounded-full border-2 border-[#F5EFE6]/40 flex items-center justify-center font-bold"
                  style={{ backgroundColor: "transparent", color: "#F5EFE6" }}
                >
                  ✕
                </motion.button>
              </div>

              {/* Corpo */}
              <div className="p-6 space-y-5">
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-xl border-2 border-[#F5EFE6]/30 flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#D4A95F" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                      style={{ color: "#1A1614" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm leading-relaxed opacity-85">
                    Garanta que é você mesmo! Digite sua senha.
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
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-[#F5EFE6]/30 focus:outline-none focus:border-[#C97B63] transition-colors"
                    style={{
                      backgroundColor: "#1A1614",
                      color: "#F5EFE6",
                    }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div
                className="px-6 py-4 border-t-2 border-[#F5EFE6]/20 flex gap-3"
                style={{ backgroundColor: "#1A1614" }}
              >
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={fecharModal}
                  className="flex-1 py-2.5 rounded-xl border-2 border-[#F5EFE6]/40 font-semibold text-sm"
                  style={{
                    backgroundColor: "transparent",
                    color: "#F5EFE6",
                  }}
                >
                  Voltar
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReativarConfirm}
                  disabled={!senha.trim()}
                  className="flex-1 py-2.5 rounded-xl border-2 border-[#F5EFE6]/40 font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "#C97B63",
                    color: "#F5EFE6",
                    boxShadow: "3px 3px 0 0 rgba(0, 0, 0, 0.5)",
                  }}
                >
                  Reativar
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
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
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
