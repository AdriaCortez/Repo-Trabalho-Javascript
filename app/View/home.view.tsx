"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";

type Tip = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  accent: string;
};

const tips: Tip[] = [
  {
    id: 1,
    title: "A Regra das Três Prioridades",
    category: "Planejamento",
    description:
      "Antes de abrir qualquer aba ou mensagem, escreva em um papel apenas três coisas que, se feitas hoje, farão o dia valer a pena. Três, não dez. A escassez força a escolha, e a escolha gera foco. Quando você tenta priorizar tudo, não prioriza nada. Comece pequeno, termine forte.",
    image:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1200&q=80",
    accent: "#F4A5B0",
  },
  {
    id: 2,
    title: "Time Blocking com Respiro",
    category: "Tempo",
    description:
      "Divida o seu dia em blocos temáticos — manhã para criação, tarde para reuniões, fim do dia para revisão. Mas deixe, entre cada bloco, 15 minutos de respiro sem tela. O cérebro não é uma máquina de produção contínua; ele precisa de silêncio para consolidar o que foi feito. Bloquear o tempo é também bloquear a ansiedade.",
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&q=80",
    accent: "#6B5B95",
  },
  {
    id: 3,
    title: "Pomodoro Suave (50/10)",
    category: "Foco",
    description:
      "Esqueça os 25 minutos rígidos. Trabalhe por 50 minutos em uma única tarefa, sem notificações, e descanse 10 minutos de verdade — levante, estique, olhe pela janela, tome um gole d'água. A variação 50/10 respeita melhor o ritmo natural de concentração de um adulto e evita a fadiga do fim da tarde.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80",
    accent: "#F2C14E",
  },
  {
    id: 4,
    title: "O Ritual da Mesa Posta",
    category: "Ambiente",
    description:
      "Antes de começar o dia, arrume a sua mesa como se fosse receber alguém importante. Um copo d'água, um caderno aberto, uma planta, uma luz quente. O ambiente fala com o cérebro antes de qualquer tarefa. Uma mesa caótica gera uma mente caótica; uma mesa cuidada convida à calma e ao começo.",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&q=80",
    accent: "#5B8DB8",
  },
  {
    id: 5,
    title: "A Primeira Hora Sem Tela",
    category: "Hábito",
    description:
      "A primeira hora do dia define o tom das próximas dez. Em vez de rolar o feed, use esse tempo para algo lento: café, leitura, caminhada curta, alongamento. Quem começa o dia reagindo a notificações passa o resto do dia no modo reação. Quem começa no modo intenção mantém o controle.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
    accent: "#F4A5B0",
  },
  {
    id: 6,
    title: "Revisão Noturna de 5 Minutos",
    category: "Encerramento",
    description:
      "Antes de dormir, reserve cinco minutos para escrever: o que foi feito, o que ficou pendente, e a primeira coisa que será feita amanhã. Isso fecha os ciclos abertos na mente e evita que você leve preocupações para o travesseiro. Dormir com a cabeça organizada é acordar com energia.",
    image:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1200&q=80",
    accent: "#6B5B95",
  },
  {
    id: 7,
    title: "Matriz de Eisenhower Simplificada",
    category: "Decisão",
    description:
      "Toda tarefa se encaixa em uma de quatro caixas: urgente e importante (faça agora), importante mas não urgente (agende), urgente mas não importante (delegate), nem urgente nem importante (elimine). A maioria das pessoas vive na primeira caixa. O segredo da organização é morar na segunda.",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80",
    accent: "#F2C14E",
  },
  {
    id: 8,
    title: "A Regra dos Dois Minutos",
    category: "Ação",
    description:
      "Se uma tarefa leva menos de dois minutos — responder um e-mail curto, guardar um livro, lavar uma xícara — faça agora, na hora. Não anote, não adie. O custo mental de lembrar dessas pequenas coisas é muito maior do que o custo de executá-las. Mentes organizadas são mentes leves.",
    image:
      "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=1200&q=80",
    accent: "#5B8DB8",
  },
  {
    id: 9,
    title: "Captura Antes de Processar",
    category: "Método GTD",
    description:
      "Toda ideia, tarefa ou lembrete que surgir deve ser capturado imediatamente em um único lugar — um caderno, um app, uma caixa de entrada. Não tente processar na hora. Depois, em momentos específicos do dia, esvazie essa caixa e decida o destino de cada item. A mente serve para ter ideias, não para guardá-las.",
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?w=1200&q=80",
    accent: "#F4A5B0",
  },
  {
    id: 10,
    title: "Descanso é Parte do Trabalho",
    category: "Bem-estar",
    description:
      "Organização não é fazer mais coisas, é fazer as coisas certas no ritmo certo. Incluir pausas, sono, refeições e lazer na sua agenda não é luxo — é infraestrutura. Quem não agenda o descanso é obrigado a descansar à força, geralmente quando o corpo já não aguenta mais.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
    accent: "#6B5B95",
  },
  {
    id: 11,
    title: "Prepare a Roupa na Noite Anterior",
    category: "Rotina",
    description:
      "Parece bobo, mas decidir o que vestir de manhã é uma decisão a menos. Prepare a roupa, a bolsa, o café já medido, o caderno aberto na página certa. Cada pequena decisão eliminada de manhã libera energia mental para o que realmente importa. A manhã deve ser um corredor, não um labirinto.",
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&q=80",
    accent: "#F2C14E",
  },
  {
    id: 12,
    title: "Um Dia Por Vez, Uma Semana Por Vez",
    category: "Perspectiva",
    description:
      "Não tente organizar a vida inteira de uma vez. Planeje a semana no domingo à noite, planeje o dia na noite anterior, execute o momento presente. A organização sustentável é feita de camadas pequenas que se repetem, não de grandes revoluções que duram três dias. Constância vence intensidade.",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80",
    accent: "#5B8DB8",
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % tips.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovering]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % tips.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + tips.length) % tips.length);

  const current = tips[currentSlide];

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
          <motion.div
            whileHover={{ rotate: -8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-10 h-10 border-2 border-[#2A2520] flex items-center justify-center font-black text-lg"
            style={{ backgroundColor: "#F2C14E" }}
          >
            N
          </motion.div>
          <span
            className="text-2xl font-black tracking-tight"
            style={{ fontFamily: '"Fraunces", Georgia, serif' }}
          >
            Notticks
          </span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <a
            href="#sobre"
            className="hover:underline underline-offset-4 transition-colors hover:text-[#6B5B95]"
          >
            Sobre
          </a>
          <a
            href="#dicas"
            className="hover:underline underline-offset-4 transition-colors hover:text-[#6B5B95]"
          >
            Dicas
          </a>
          <a
            href="#grupo"
            className="hover:underline underline-offset-4 transition-colors hover:text-[#6B5B95]"
          >
            Grupo
          </a>
        </nav>
      </motion.header>

      {/* HERO */}
      <main className="relative z-10 flex-1 flex flex-col">
        <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 md:py-28 relative">
          {/* Formas decorativas flutuantes */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            aria-hidden
            className="absolute top-16 left-8 md:left-24 w-20 h-20 border-2 border-[#2A2520] rotate-6 hidden md:block"
            style={{ backgroundColor: "#F4A5B0" }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            aria-hidden
            className="absolute bottom-24 right-10 md:right-32 w-28 h-28 rounded-full border-2 border-[#2A2520] hidden md:block"
            style={{ backgroundColor: "#5B8DB8" }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            aria-hidden
            className="absolute top-40 right-16 md:right-56 w-14 h-14 border-2 border-[#2A2520] -rotate-12 hidden md:block"
            style={{ backgroundColor: "#F2C14E" }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            aria-hidden
            className="absolute bottom-40 left-16 md:left-48 w-16 h-16 border-2 border-[#2A2520] rotate-12 hidden md:block"
            style={{ backgroundColor: "#6B5B95" }}
          />

          <div className="relative z-10 max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-block px-4 py-1 border-2 border-[#2A2520] text-xs font-bold uppercase tracking-widest mb-8"
              style={{ backgroundColor: "#FAF6EF" }}
            >
              ● organização tranquila
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] mb-6"
              style={{
                fontFamily: '"Fraunces", Georgia, serif',
                color: "#2A2520",
              }}
            >
              Notticks
              <motion.span
                animate={{ rotate: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="inline-block ml-2 w-4 h-4 md:w-6 md:h-4 align-middle border-2 border-[#2A2520]"
                style={{ backgroundColor: "#F4A5B0" }}
              />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-lg md:text-2xl max-w-xl mx-auto mb-12 leading-relaxed"
              style={{
                color: "#6B6560",
                fontFamily: '"Fraunces", Georgia, serif',
                fontStyle: "italic",
              }}
            >
              Sua organização para o dia-dia.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center gap-5"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400 }}
                onClick={() => navigate("/cadastro")}
                className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-[#2A2520] font-bold text-base md:text-lg"
                style={{
                  backgroundColor: "#6B5B95",
                  color: "#FAF6EF",
                  boxShadow: "6px 6px 0 0 #2A2520",
                }}
              >
                Comece agora gratuitamente
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/login")}
                className="text-base font-medium underline underline-offset-4 decoration-2 hover:decoration-[#6B5B95] transition-colors"
                style={{ color: "#2A2520" }}
              >
                Já possuo uma conta
              </motion.button>
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs font-medium text-[#6B6560]"
          >
            <span>role para descobrir</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↓
            </motion.span>
          </motion.div>
        </section>

        {/* CAROUSEL SECTION */}
        <section
          id="dicas"
          className="border-t-2 border-[#2A2520] px-6 md:px-12 py-16 md:py-24 relative"
          style={{ backgroundColor: "#F3EEE3" }}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
            >
              <div>
                <span
                  className="inline-block px-3 py-1 border-2 border-[#2A2520] text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ backgroundColor: "#F2C14E" }}
                >
                  dicas rápidas
                </span>
                <h2
                  className="text-4xl md:text-6xl font-black tracking-tight leading-none"
                  style={{ fontFamily: '"Fraunces", Georgia, serif' }}
                >
                  Pequenos rituais,
                  <br />
                  <span style={{ color: "#6B5B95" }}>grandes mudanças.</span>
                </h2>
              </div>
              <p
                className="max-w-sm text-sm md:text-base leading-relaxed"
                style={{ color: "#6B6560" }}
              >
                Doze ideias curtas para organizar o dia sem transformar a vida
                numa corrida. Passe pelo carrossel no seu ritmo.
              </p>
            </motion.div>

            {/* Carousel container */}
            <motion.div
              ref={carouselRef}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="relative border-2 border-[#2A2520]"
              style={{
                backgroundColor: "#FAF6EF",
                boxShadow: "10px 10px 0 0 #2A2520",
              }}
            >
              {/* Top bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b-2 border-[#2A2520]">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full border border-[#2A2520]"
                    style={{ backgroundColor: "#F4A5B0" }}
                  />
                  <span
                    className="w-3 h-3 rounded-full border border-[#2A2520]"
                    style={{ backgroundColor: "#F2C14E" }}
                  />
                  <span
                    className="w-3 h-3 rounded-full border border-[#2A2520]"
                    style={{ backgroundColor: "#5B8DB8" }}
                  />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest">
                  {String(currentSlide + 1).padStart(2, "0")} /{" "}
                  {String(tips.length).padStart(2, "0")}
                </span>
              </div>

              <div className="grid md:grid-cols-2">
                {/* Image com AnimatePresence */}
                <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[480px] overflow-hidden border-b-2 md:border-b-0 md:border-r-2 border-[#2A2520]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.id}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0"
                    >
                      <img
                        src={current.image}
                        alt={current.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 mix-blend-multiply opacity-30"
                        style={{ backgroundColor: current.accent }}
                      />
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="absolute top-4 left-4"
                      >
                        <span
                          className="inline-block px-3 py-1 border-2 border-[#2A2520] text-xs font-bold uppercase tracking-widest"
                          style={{
                            backgroundColor: current.accent,
                            color: "#2A2520",
                          }}
                        >
                          {current.category}
                        </span>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Text com AnimatePresence */}
                <div className="p-8 md:p-12 flex flex-col justify-between min-h-[320px] relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <h3
                        className="text-3xl md:text-4xl font-black leading-tight mb-6 tracking-tight"
                        style={{ fontFamily: '"Fraunces", Georgia, serif' }}
                      >
                        {current.title}
                      </h3>
                      <p
                        className="text-base md:text-lg leading-relaxed"
                        style={{ color: "#4A4540" }}
                      >
                        {current.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-8 flex items-center justify-between pt-6 border-t-2 border-dashed border-[#2A2520]">
                    <div className="flex gap-1.5 flex-wrap max-w-[60%]">
                      {tips.map((tip, idx) => (
                        <motion.button
                          key={tip.id}
                          onClick={() => setCurrentSlide(idx)}
                          aria-label={`Ir para dica ${idx + 1}`}
                          whileHover={{ scale: 1.2 }}
                          className="h-2 border border-[#2A2520] transition-all duration-300"
                          style={{
                            width: idx === currentSlide ? "28px" : "8px",
                            backgroundColor:
                              idx === currentSlide ? tip.accent : "transparent",
                          }}
                        />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={prevSlide}
                        aria-label="Anterior"
                        className="w-11 h-11 border-2 border-[#2A2520] flex items-center justify-center font-bold text-lg"
                        style={{ backgroundColor: "#FAF6EF" }}
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
                            d="M15.75 19.5 8.25 12l7.5-7.5"
                          />
                        </svg>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextSlide}
                        aria-label="Próximo"
                        className="w-11 h-11 border-2 border-[#2A2520] flex items-center justify-center font-bold text-lg"
                        style={{ backgroundColor: "#2A2520", color: "#FAF6EF" }}
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
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tip grid preview */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
              {tips.map((tip, idx) => (
                <motion.button
                  key={tip.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setCurrentSlide(idx);
                    carouselRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }}
                  className="text-left p-4 border-2 border-[#2A2520] transition-colors"
                  style={{
                    backgroundColor:
                      idx === currentSlide ? tip.accent : "#FAF6EF",
                    boxShadow:
                      idx === currentSlide
                        ? "4px 4px 0 0 #2A2520"
                        : "2px 2px 0 0 #2A2520",
                  }}
                >
                  <span className="text-xs font-bold uppercase tracking-widest block mb-2">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-sm font-bold leading-tight block"
                    style={{ fontFamily: '"Fraunces", Georgia, serif' }}
                  >
                    {tip.title}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        id="contato"
        className="relative z-10 border-t-2 border-[#2A2520] px-6 md:px-12 py-8"
        style={{ backgroundColor: "#2A2520", color: "#FAF6EF" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 border-2 flex items-center justify-center font-black text-sm"
              style={{
                borderColor: "#FAF6EF",
                backgroundColor: "#F2C14E",
                color: "#2A2520",
              }}
            >
              N
            </div>
            <span
              className="text-lg font-black tracking-tight"
              style={{ fontFamily: '"Fraunces", Georgia, serif' }}
            >
              Notticks
            </span>
          </div>
          <p className="text-xs md:text-sm text-center md:text-right leading-relaxed opacity-90">
            Desenvolvido pelo grupo 9 — Universidade Católica de Brasília 2026
          </p>
        </div>
      </motion.footer>
    </div>
  );
}
