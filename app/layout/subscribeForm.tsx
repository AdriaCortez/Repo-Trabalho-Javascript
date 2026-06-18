"use client";

import { Link } from "react-router";

// ─── Props que a view passa para o formulário ─────────────────────────────────
interface SubscribeFormProps {
  nome: string;
  setNome: (v: string) => void;
  username: string;
  setUsername: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  senha: string;
  setSenha: (v: string) => void;
  confirmarSenha: string;
  setConfirmarSenha: (v: string) => void;
  erro: string;
  carregando: boolean;
  handleSubscribe: (e: React.FormEvent<HTMLFormElement>) => void;
}

// ─── Componente visual do formulário de cadastro ──────────────────────────────
export default function Cadastro({
  nome,
  setNome,
  username,
  setUsername,
  email,
  setEmail,
  senha,
  setSenha,
  confirmarSenha,
  setConfirmarSenha,
  erro,
  carregando,
  handleSubscribe,
}: SubscribeFormProps) {
  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center px-4 py-12">
      {/* Fundo decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/8 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">K</span>
            </div>
            <span className="text-white font-bold text-2xl tracking-tight">Kanban</span>
          </div>
          <p className="text-slate-400 text-sm">Crie sua conta gratuitamente</p>
        </div>

        {/* Card */}
        <div className="bg-[#16181f] border border-white/8 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-white font-semibold text-xl mb-1">Criar conta</h1>
          <p className="text-slate-400 text-sm mb-7">
            Já tem conta?{" "}
            <Link
              to="/login"
              className="text-violet-400 hover:text-violet-300 transition-colors"
            >
              Fazer login
            </Link>
          </p>

          <form onSubmit={handleSubscribe} className="space-y-4">
            {/* Nome + Username */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">
                  Nome
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full bg-[#0f1117] border border-white/10 rounded-xl px-3 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="@usuario"
                  className="w-full bg-[#0f1117] border border-white/10 rounded-xl px-3 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all"
                />
              </div>
            </div>

            {/* E-mail */}
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                autoComplete="email"
                className="w-full bg-[#0f1117] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all"
              />
            </div>

            {/* Senha */}
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">
                Senha
              </label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                autoComplete="new-password"
                className="w-full bg-[#0f1117] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all"
              />
            </div>

            {/* Confirmar senha */}
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">
                Confirmar senha
              </label>
              <input
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                placeholder="Repita a senha"
                autoComplete="new-password"
                className="w-full bg-[#0f1117] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all"
              />
            </div>

            {/* Erro */}
            {erro && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                <span className="text-red-400 text-xs">⚠</span>
                <p className="text-red-400 text-xs">{erro}</p>
              </div>
            )}

            {/* Botão */}
            <button
              type="submit"
              disabled={carregando}
              className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-3 text-sm transition-colors mt-2"
            >
              {carregando ? "Criando conta…" : "Criar conta"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
