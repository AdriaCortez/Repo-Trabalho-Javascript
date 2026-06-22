"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";

type TrocarSenhaViewProps = {
  senhaAtual: string;
  novaSenha: string;
  confirmarSenha: string;
  user: any;
  carregando: boolean;
  setSenhaAtual: (v: string) => void;
  setNovaSenha: (v: string) => void;
  setConfirmarSenha: (v: string) => void;
  setUser: (v: any) => void;
  setCarregando: (v: boolean) => void;
  MudarSenha: (e: React.FormEvent<HTMLFormElement>) => void;
  Logout: () => void;
};

export default function TrocarSenhaView({
  senhaAtual,
  novaSenha,
  confirmarSenha,
  user,
  carregando,
  setSenhaAtual,
  setNovaSenha,
  setConfirmarSenha,
  setUser,
  setCarregando,
  MudarSenha,
  Logout,
}: TrocarSenhaViewProps) {
  const navigate = useNavigate();

  // Estados para simular o carregamento com kb/s
  const [progresso, setProgresso] = useState(0);
  const [velocidade, setVelocidade] = useState(0);
  const [bytesEnviados, setBytesEnviados] = useState(0);
  const [tempoRestante, setTempoRestante] = useState(5);

  // Simula o progresso de 5 segundos com velocidade variável em kb/s
  useEffect(() => {
    if (!carregando) {
      setProgresso(0);
      setVelocidade(0);
      setBytesEnviados(0);
      setTempoRestante(5);
      return;
    }

    const inicio = Date.now();
    const duracaoTotal = 5000; // 5 segundos
    let totalBytes = 0;

    const interval = setInterval(() => {
      const tempoDecorrido = Date.now() - inicio;
      const pct = Math.min((tempoDecorrido / duracaoTotal) * 100, 100);
      setProgresso(pct);

      // Simula velocidade entre 120 e 480 kb/s
      const vel = Math.floor(120 + Math.random() * 360);
      setVelocidade(vel);

      // Acumula bytes enviados (vel em kb/s * intervalo de 100ms / 1000)
      totalBytes += (vel * 100) / 1000;
      setBytesEnviados(totalBytes);

      // Tempo restante
      const restante = Math.max(
        0,
        Math.ceil((duracaoTotal - tempoDecorrido) / 1000),
      );
      setTempoRestante(restante);

      if (tempoDecorrido >= duracaoTotal) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [carregando]);

  const fields = [
    {
      label: "Senha atual",
      value: senhaAtual,
      setter: setSenhaAtual,
      placeholder: "••••••••",
      type: "password",
      icon: "✦",
      ajuda: "Digite sua senha atual para verificação",
    },
    {
      label: "Nova senha",
      value: novaSenha,
      setter: setNovaSenha,
      placeholder: "••••••••",
      type: "password",
      icon: "❋",
      ajuda: "Mínimo de 6 caracteres",
    },
    {
      label: "Confirmar nova senha",
      value: confirmarSenha,
      setter: setConfirmarSenha,
      placeholder: "••••••••",
      type: "password",
      icon: "✿",
      ajuda: "Digite a nova senha novamente",
    },
  ];

  // Indicador de força da senha
  const forcaSenha = () => {
    if (!novaSenha) return { texto: "—", cor: "#A8A29A", width: "0%" };
    if (novaSenha.length < 6)
      return { texto: "Fraca", cor: "#E07856", width: "33%" };
    if (novaSenha.length < 10)
      return { texto: "Média", cor: "#F2C14E", width: "66%" };
    return { texto: "Forte", cor: "#6B9B6B", width: "100%" };
  };

  const forca = forcaSenha();
  const senhasCoincidem =
    confirmarSenha.length > 0 && novaSenha === confirmarSenha;
  const senhasDiferentes =
    confirmarSenha.length > 0 && novaSenha !== confirmarSenha;

  return (
    <div
      className="h-screen w-screen overflow-hidden flex flex-col relative"
      style={{
        backgroundColor: "#FAF6EF",
        color: "#2A2520",
        fontFamily: '"Inter", system-ui, sans-serif',
      }}
    >
      {/* Fundo com listras suaves (grid de caderno) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(42, 37, 32, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(42, 37, 32, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px, 100% 32px",
        }}
      />

      {/* Glow suave verde (solar punk) */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] blur-[140px] opacity-25 rounded-full z-0"
        style={{
          background:
            "radial-gradient(circle, #A8C9A8 0%, #F2C14E 40%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[500px] blur-[140px] opacity-25 rounded-full z-0"
        style={{
          background:
            "radial-gradient(circle, #6B9B6B 0%, #4A7A4A 40%, transparent 70%)",
        }}
      />

      {/* Doodle xícara de café — canto superior esquerdo */}
      <motion.svg
        initial={{ opacity: 0, rotate: 10 }}
        animate={{ opacity: 1, rotate: 6 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        aria-hidden
        className="absolute top-24 left-12 w-20 h-20 z-0 hidden md:block"
        viewBox="0 0 100 100"
        fill="none"
        stroke="#2A2520"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M25 40 L 25 70 Q 25 82, 40 82 L 60 82 Q 75 82, 75 70 L 75 40 Z"
          fill="#F2C14E"
          fillOpacity="0.5"
        />
        <path d="M75 48 Q 88 48, 88 58 Q 88 68, 75 68" />
        <motion.path
          d="M35 28 Q 38 22, 35 16"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.path
          d="M50 28 Q 53 22, 50 16"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
        />
        <motion.path
          d="M65 28 Q 68 22, 65 16"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
        />
      </motion.svg>

      {/* Doodle planta — canto inferior esquerdo (agora em verde) */}
      <motion.svg
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        aria-hidden
        className="absolute bottom-24 left-16 w-16 h-20 z-0 hidden md:block"
        viewBox="0 0 80 100"
        fill="none"
        stroke="#2A2520"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M40 90 L 40 50" />
        <path
          d="M40 70 Q 25 65, 20 50 Q 25 55, 40 60"
          fill="#6B9B6B"
          fillOpacity="0.5"
        />
        <path
          d="M40 60 Q 55 55, 60 40 Q 55 45, 40 50"
          fill="#A8C9A8"
          fillOpacity="0.5"
        />
        <path
          d="M40 50 Q 30 40, 25 25 Q 30 30, 40 40"
          fill="#F2C14E"
          fillOpacity="0.4"
        />
      </motion.svg>

      {/* Doodle cadeado — canto inferior direito */}
      <motion.svg
        initial={{ opacity: 0, rotate: -10 }}
        animate={{ opacity: 1, rotate: -6 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        aria-hidden
        className="absolute bottom-28 right-20 w-20 h-20 z-0 hidden md:block"
        viewBox="0 0 100 100"
        fill="none"
        stroke="#2A2520"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect
          x="20"
          y="45"
          width="60"
          height="45"
          rx="4"
          fill="#6B9B6B"
          fillOpacity="0.5"
        />
        <path d="M30 45 V 30 Q 30 15, 50 15 Q 70 15, 70 30 V 45" />
        <circle cx="50" cy="65" r="4" fill="#F2C14E" />
        <path d="M50 69 V 78" />
      </motion.svg>

      {/* Estrelinhas decorativas */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
        aria-hidden
        className="absolute top-36 right-28 w-6 h-6 border-2 border-[#2A2520] rotate-12 hidden md:block"
        style={{ backgroundColor: "#A8C9A8" }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        aria-hidden
        className="absolute top-52 left-36 w-4 h-4 rounded-full border-2 border-[#2A2520] hidden md:block"
        style={{ backgroundColor: "#F2C14E" }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9 }}
        aria-hidden
        className="absolute bottom-52 right-44 w-5 h-5 border-2 border-[#2A2520] -rotate-6 hidden md:block"
        style={{ backgroundColor: "#6B9B6B" }}
      />

      {/* HEADER */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 px-6 md:px-12 py-5 flex items-center justify-between border-b-2 border-[#2A2520]"
        style={{
          backgroundColor: "rgba(250, 246, 239, 0.85)",
          backdropFilter: "blur(6px)",
        }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: -8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-9 h-9 border-2 border-[#2A2520] flex items-center justify-center font-black text-base"
            style={{ backgroundColor: "#F2C14E" }}
          >
            N
          </motion.div>
          <span
            className="text-xl font-black tracking-tight"
            style={{ fontFamily: '"Fraunces", Georgia, serif' }}
          >
            Notticks
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05, x: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="w-11 h-11 border-2 border-[#2A2520] flex items-center justify-center font-bold"
          style={{
            backgroundColor: "#FAF6EF",
            boxShadow: "3px 3px 0 0 #2A2520",
          }}
          aria-label="Voltar"
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
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </motion.button>
      </motion.header>

      {/* MAIN */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-6 overflow-y-auto">
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Coluna esquerda — título e texto */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden md:block"
          >
            <span
              className="inline-block px-3 py-1 border-2 border-[#2A2520] text-xs font-bold uppercase tracking-widest mb-5"
              style={{ backgroundColor: "#6B9B6B" }}
            >
              ● segurança da conta
            </span>
            <h1
              className="text-4xl lg:text-5xl font-black tracking-tight leading-[1.05] mb-4"
              style={{ fontFamily: '"Fraunces", Georgia, serif' }}
            >
              Uma nova{" "}
              <span style={{ color: "#4A7A4A", fontStyle: "italic" }}>
                senha
              </span>
              , um novo começo
            </h1>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "#4A4540" }}
            >
              Atualize sua senha para manter sua conta segura. Escolha algo que
              só você saiba — e que seja difícil de adivinhar.
            </p>

            {/* Mini lista decorativa */}
            <div
              className="space-y-2 text-sm font-medium"
              style={{ color: "#4A4540" }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#F2C14E" }}
                />
                Conexão criptografada de ponta a ponta
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#6B9B6B" }}
                />
                Seus dados permanecem privados
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#F4A5B0" }}
                />
                Logout automático após a troca
              </div>
            </div>
          </motion.div>

          {/* Coluna direita — formulário estilo caderno */}
          <motion.form
            onSubmit={MudarSenha}
            initial={{ opacity: 0, y: 30, rotate: 1 }}
            animate={{ opacity: 1, y: 0, rotate: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Fita adesiva decorativa no topo */}
            <div
              aria-hidden
              className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-6 rotate-[2deg] z-20 opacity-80"
              style={{
                background:
                  "repeating-linear-gradient(45deg, #6B9B6B, #6B9B6B 4px, #4A7A4A 4px, #4A7A4A 8px)",
                border: "1px solid rgba(42, 37, 32, 0.2)",
                boxShadow: "0 2px 4px rgba(42, 37, 32, 0.15)",
              }}
            />

            <div
              className="relative rounded-2xl border-2 border-[#2A2520] overflow-hidden"
              style={{
                backgroundColor: "#FFFDF7",
                boxShadow: "8px 8px 0 0 #2A2520",
              }}
            >
              {/* Margem verde estilo caderno */}
              <div
                aria-hidden
                className="absolute top-0 bottom-0 left-12 w-[2px] z-10"
                style={{ backgroundColor: "rgba(107, 155, 107, 0.6)" }}
              />

              {/* Furação do caderno */}
              <div className="absolute left-4 top-0 bottom-0 flex flex-col justify-around py-8 z-10">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full border-2 border-[#2A2520]"
                    style={{ backgroundColor: "#FAF6EF" }}
                  />
                ))}
              </div>

              {/* Conteúdo do caderno */}
              <div className="pl-20 pr-7 py-7">
                {/* Cabeçalho do caderno */}
                <div className="md:hidden mb-5">
                  <h1
                    className="text-2xl font-black tracking-tight leading-tight mb-2"
                    style={{ fontFamily: '"Fraunces", Georgia, serif' }}
                  >
                    Uma nova{" "}
                    <span style={{ color: "#4A7A4A", fontStyle: "italic" }}>
                      senha
                    </span>
                  </h1>
                  <p className="text-sm" style={{ color: "#4A4540" }}>
                    Atualize sua senha para manter sua conta segura.
                  </p>
                </div>

                <div className="hidden md:block mb-5 pb-3 border-b-2 border-dashed border-[#2A2520]">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: "#6B6560" }}
                    >
                      caderno de segurança · n° 03
                    </span>
                    <span
                      className="text-xs font-bold"
                      style={{ color: "#6B9B6B" }}
                    >
                      ✦ change password
                    </span>
                  </div>
                </div>

                {/* Campos */}
                <div className="space-y-5">
                  {fields.map((field, idx) => (
                    <motion.div
                      key={field.label}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="relative"
                    >
                      <label
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1.5"
                        style={{ color: "#4A4540" }}
                      >
                        <span style={{ color: "#4A7A4A" }}>{field.icon}</span>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        value={field.value}
                        onChange={(e) => field.setter(e.target.value)}
                        placeholder={field.placeholder}
                        required
                        disabled={carregando}
                        className="w-full bg-transparent border-b-2 border-[#2A2520] border-opacity-30 py-2 pr-2 text-sm font-medium placeholder:text-[#A8A29A] focus:outline-none focus:border-[#4A7A4A] transition-colors disabled:opacity-50"
                        style={{
                          backgroundImage:
                            "linear-gradient(to bottom, transparent 95%, rgba(42, 37, 32, 0.15) 95%)",
                          backgroundSize: "100% 32px",
                        }}
                      />
                      <p
                        className="text-[10px] mt-1 opacity-60"
                        style={{ color: "#4A4540" }}
                      >
                        {field.ajuda}
                      </p>

                      {/* Indicador de força da senha (só no campo novaSenha) */}
                      {field.label === "Nova senha" && novaSenha && (
                        <div className="mt-2">
                          <div
                            className="h-1 w-full rounded-full overflow-hidden"
                            style={{ backgroundColor: "#E8DFD0" }}
                          >
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: forca.width }}
                              transition={{ duration: 0.3 }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: forca.cor }}
                            />
                          </div>
                          <p
                            className="text-[10px] mt-1 font-bold uppercase tracking-wider"
                            style={{ color: forca.cor }}
                          >
                            Força: {forca.texto}
                          </p>
                        </div>
                      )}

                      {/* Indicador de coincidência (só no campo confirmar) */}
                      {field.label === "Confirmar nova senha" &&
                        confirmarSenha && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-[10px] mt-1 font-bold uppercase tracking-wider"
                            style={{
                              color: senhasCoincidem ? "#4A7A4A" : "#E07856",
                            }}
                          >
                            {senhasCoincidem
                              ? "✓ senhas coincidem"
                              : "✕ senhas não coincidem"}
                          </motion.p>
                        )}
                    </motion.div>
                  ))}
                </div>

                {/* Botão de submissão */}
                <motion.button
                  type="submit"
                  disabled={carregando}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="w-full mt-6 py-3 border-2 border-[#2A2520] font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "#6B9B6B",
                    color: "#FAF6EF",
                    boxShadow: "4px 4px 0 0 #2A2520",
                    borderRadius: "10px",
                  }}
                >
                  {carregando ? "Processando..." : "Alterar senha"}
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
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Sombra decorativa extra */}
            <div
              aria-hidden
              className="absolute -bottom-2 -right-2 inset-0 rounded-2xl border-2 border-[#2A2520] -z-10 opacity-30"
              style={{ backgroundColor: "#6B9B6B" }}
            />
          </motion.form>
        </div>
      </main>

      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="relative z-10 border-t-2 border-[#2A2520] px-6 md:px-12 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
        style={{
          backgroundColor: "rgba(42, 37, 32, 0.95)",
          color: "#FAF6EF",
          backdropFilter: "blur(6px)",
        }}
      >
        <p className="opacity-90 text-center sm:text-left">
          Autenticação feita por:{" "}
          <span className="font-bold">Ádria Cortez</span> — Universidade
          Católica de Brasília
        </p>
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: "#F2C14E" }}
          />
          <p className="opacity-90 font-medium tracking-wide">
            AES256 — Conexão segura
          </p>
        </div>
      </motion.footer>

      {/* OVERLAY DE CARREGAMENTO */}
      <AnimatePresence>
        {carregando && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{
              backgroundColor: "rgba(42, 37, 32, 0.75)",
              backdropFilter: "blur(8px)",
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="w-full max-w-md rounded-2xl border-2 border-[#2A2520] overflow-hidden"
              style={{
                backgroundColor: "#FFFDF7",
                boxShadow: "10px 10px 0 0 #2A2520",
              }}
            >
              {/* Cabeçalho do card de loading */}
              <div
                className="px-6 py-4 border-b-2 border-[#2A2520] flex items-center gap-3"
                style={{ backgroundColor: "#6B9B6B", color: "#FAF6EF" }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-8 h-8 border-2 border-[#FAF6EF] border-t-transparent rounded-full flex-shrink-0"
                />
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-70">
                    processando requisição
                  </p>
                  <h3
                    className="text-lg font-black tracking-tight"
                    style={{ fontFamily: '"Fraunces", Georgia, serif' }}
                  >
                    Alterando sua senha...
                  </h3>
                </div>
              </div>

              {/* Corpo */}
              <div className="p-6 space-y-5">
                {/* Texto carregando com pontos animados */}
                <div className="flex items-center justify-center gap-1 text-sm font-bold">
                  <span>carregando</span>
                  <motion.span
                    animate={{ opacity: [0, 1, 1, 1] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      times: [0, 0.33, 0.66, 1],
                    }}
                  >
                    .
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [0, 0, 1, 1] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      times: [0, 0.33, 0.66, 1],
                    }}
                  >
                    .
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [0, 0, 0, 1] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      times: [0, 0.33, 0.66, 1],
                    }}
                  >
                    .
                  </motion.span>
                </div>

                {/* Barra de progresso */}
                <div>
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider mb-1.5">
                    <span style={{ color: "#4A4540" }}>Progresso</span>
                    <span style={{ color: "#4A7A4A" }}>
                      {progresso.toFixed(0)}%
                    </span>
                  </div>
                  <div
                    className="h-3 w-full rounded-full overflow-hidden border border-[#2A2520]/30"
                    style={{ backgroundColor: "#E8DFD0" }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, #6B9B6B 0%, #A8C9A8 50%, #6B9B6B 100%)",
                        backgroundSize: "200% 100%",
                      }}
                      animate={{
                        width: `${progresso}%`,
                        backgroundPosition: ["0% 0%", "200% 0%"],
                      }}
                      transition={{
                        width: { duration: 0.1, ease: "linear" },
                        backgroundPosition: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        },
                      }}
                    />
                  </div>
                </div>

                {/* Estatísticas de rede */}
                <div
                  className="rounded-xl border-2 border-dashed border-[#2A2520]/30 p-4 space-y-2.5"
                  style={{ backgroundColor: "#FAF6EF" }}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className="font-bold uppercase tracking-wider"
                      style={{ color: "#6B6560" }}
                    >
                      Velocidade
                    </span>
                    <span className="font-black tabular-nums">
                      <motion.span
                        key={velocidade}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ color: "#4A7A4A" }}
                      >
                        {velocidade}
                      </motion.span>{" "}
                      <span style={{ color: "#6B6560" }}>kb/s</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span
                      className="font-bold uppercase tracking-wider"
                      style={{ color: "#6B6560" }}
                    >
                      Enviados
                    </span>
                    <span className="font-black tabular-nums">
                      <motion.span
                        key={Math.floor(bytesEnviados)}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ color: "#4A7A4A" }}
                      >
                        {bytesEnviados.toFixed(1)}
                      </motion.span>{" "}
                      <span style={{ color: "#6B6560" }}>kb</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span
                      className="font-bold uppercase tracking-wider"
                      style={{ color: "#6B6560" }}
                    >
                      Tempo restante
                    </span>
                    <span className="font-black tabular-nums">
                      <motion.span
                        key={tempoRestante}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ color: "#4A7A4A" }}
                      >
                        {tempoRestante}
                      </motion.span>
                      <span style={{ color: "#6B6560" }}>s</span>
                    </span>
                  </div>
                </div>

                {/* Dica de segurança */}
                <div className="flex items-start gap-2 text-[11px] opacity-70">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                    style={{ color: "#4A7A4A" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                  <p style={{ color: "#4A4540" }}>
                    Não feche esta janela. Você será desconectado após a
                    alteração.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}