"use client";

import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import type { LoginViewPropriedades } from "~/Model/props.model";

export function LoginView({
  username,
  senha,
  setUsername,
  setSenha,
  onSubmit,
}: LoginViewPropriedades) {
  const navigate = useNavigate();

  const fields = [
    {
      label: "Seu nome de usuário",
      value: username,
      setter: setUsername,
      placeholder: "@maria.calm",
      type: "text",
      icon: "❋",
    },
    {
      label: "Sua senha secreta",
      value: senha,
      setter: setSenha,
      placeholder: "••••••••",
      type: "password",
      icon: "✦",
    },
  ];

  return (
    <div
      className="h-screen w-screen overflow-hidden flex flex-col relative"
      style={{
        backgroundColor: "#FAF6EF",
        color: "#2A2520",
        fontFamily: '"Inter", system-ui, sans-serif',
      }}
    >
      {/* Fundo com listras suaves (grid de caderno + linhas verticais) */}
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

      {/* Glow suave solar punk */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] blur-[140px] opacity-25 rounded-full z-0"
        style={{
          background:
            "radial-gradient(circle, #F4A5B0 0%, #F2C14E 40%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[500px] blur-[140px] opacity-25 rounded-full z-0"
        style={{
          background:
            "radial-gradient(circle, #5B8DB8 0%, #6B5B95 40%, transparent 70%)",
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

      {/* Doodle planta — canto inferior esquerdo */}
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
          fill="#F4A5B0"
          fillOpacity="0.4"
        />
        <path
          d="M40 60 Q 55 55, 60 40 Q 55 45, 40 50"
          fill="#5B8DB8"
          fillOpacity="0.4"
        />
        <path
          d="M40 50 Q 30 40, 25 25 Q 30 30, 40 40"
          fill="#F2C14E"
          fillOpacity="0.4"
        />
      </motion.svg>

      {/* Doodle envelope — canto inferior direito */}
      <motion.svg
        initial={{ opacity: 0, rotate: -10 }}
        animate={{ opacity: 1, rotate: -6 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        aria-hidden
        className="absolute bottom-28 right-20 w-20 h-16 z-0 hidden md:block"
        viewBox="0 0 100 80"
        fill="none"
        stroke="#2A2520"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect
          x="10"
          y="20"
          width="80"
          height="50"
          rx="2"
          fill="#6B5B95"
          fillOpacity="0.4"
        />
        <path d="M10 20 L 50 50 L 90 20" />
        <path d="M10 70 L 40 45" />
        <path d="M90 70 L 60 45" />
      </motion.svg>

      {/* Estrelinhas decorativas */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
        aria-hidden
        className="absolute top-36 right-28 w-6 h-6 border-2 border-[#2A2520] rotate-12 hidden md:block"
        style={{ backgroundColor: "#F4A5B0" }}
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
        style={{ backgroundColor: "#5B8DB8" }}
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
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-6">
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
              style={{ backgroundColor: "#5B8DB8" }}
            >
              ● Olá, usuário
            </span>
            <h1
              className="text-4xl lg:text-5xl font-black tracking-tight leading-[1.05] mb-4"
              style={{ fontFamily: '"Fraunces", Georgia, serif' }}
            >
              Que bom te ver{" "}
              <span style={{ color: "#6B5B95", fontStyle: "italic" }}>
                de novo
              </span>
            </h1>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "#4A4540" }}
            >
              Entre com suas credenciais para continuar. 
            </p>

            {/* Mini lista decorativa */}
            <div className="space-y-2 text-sm font-medium" style={{ color: "#4A4540" }}>
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#F2C14E" }}
                />
                Seus dados estão seguros
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#F4A5B0" }}
                />
                Conexão criptografada
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#5B8DB8" }}
                />
                Pronto para continuar
              </div>
            </div>
          </motion.div>

          {/* Coluna direita — formulário estilo caderno */}
          <motion.form
            onSubmit={onSubmit}
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
                  "repeating-linear-gradient(45deg, #5B8DB8, #5B8DB8 4px, #4A7BA7 4px, #4A7BA7 8px)",
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
              {/* Margem vermelha estilo caderno */}
              <div
                aria-hidden
                className="absolute top-0 bottom-0 left-12 w-[2px] z-10"
                style={{ backgroundColor: "rgba(244, 165, 176, 0.6)" }}
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
                    Que bom te ver{" "}
                    <span style={{ color: "#6B5B95", fontStyle: "italic" }}>
                      de novo
                    </span>
                  </h1>
                  <p className="text-sm" style={{ color: "#4A4540" }}>
                    Entre com suas credenciais para continuar.
                  </p>
                </div>

                <div className="hidden md:block mb-5 pb-3 border-b-2 border-dashed border-[#2A2520]">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: "#6B6560" }}
                    >
                      caderno de acesso · n° 02
                    </span>
                    <span
                      className="text-xs font-bold"
                      style={{ color: "#5B8DB8" }}
                    >
                      ✦ welcome back
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
                        <span style={{ color: "#6B5B95" }}>{field.icon}</span>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        value={field.value}
                        onChange={(e) => field.setter(e.target.value)}
                        placeholder={field.placeholder}
                        required
                        className="w-full bg-transparent border-b-2 border-[#2A2520] border-opacity-30 py-2 pr-2 text-sm font-medium placeholder:text-[#A8A29A] focus:outline-none focus:border-[#6B5B95] transition-colors"
                        style={{
                          backgroundImage:
                            "linear-gradient(to bottom, transparent 95%, rgba(42, 37, 32, 0.15) 95%)",
                          backgroundSize: "100% 32px",
                        }}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Botão de submissão */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="w-full mt-6 py-3 border-2 border-[#2A2520] font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: "#5B8DB8",
                    color: "#FAF6EF",
                    boxShadow: "4px 4px 0 0 #2A2520",
                    borderRadius: "10px",
                  }}
                >
                  Entrar
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
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </motion.button>

                {/* Link para cadastro */}
                <div className="mt-5 text-center">
                  <motion.button
                    type="button"
                    onClick={() => navigate("/cadastro")}
                    whileHover={{ color: "#6B5B95" }}
                    className="text-sm font-medium underline underline-offset-4 decoration-2 decoration-[#2A2520] hover:decoration-[#6B5B95] transition-colors"
                    style={{ color: "#2A2520" }}
                  >
                    Não tem conta? Cadastre-se por aqui.
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Sombra decorativa extra */}
            <div
              aria-hidden
              className="absolute -bottom-2 -right-2 inset-0 rounded-2xl border-2 border-[#2A2520] -z-10 opacity-30"
              style={{ backgroundColor: "#5B8DB8" }}
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
    </div>
  );
}