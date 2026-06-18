"use client";

import { Link } from "react-router";

// ─── Props que a view passa para o formulário ─────────────────────────────────
interface LoginFormProps {
  username: string;
  setUsername: (v: string) => void;
  senha: string;
  setSenha: (v: string) => void;
  erro: string;
  carregando: boolean;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
}

// ─── Componente visual do formulário de login ─────────────────────────────────
export default function Login({
  username,
  setUsername,
  senha,
  setSenha,
  erro,
  carregando,
  handleLogin,
}: LoginFormProps) {
  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center px-4">
      {/* Fundo decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
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
          <p className="text-slate-400 text-sm">Organize. Execute. Entregue.</p>
        </div>

        {/* Card */}
        <div className="bg-[#16181f] border border-white/8 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-white font-semibold text-xl mb-1">Bem-vindo de volta</h1>
          <p className="text-slate-400 text-sm mb-7">
            Não tem conta?{" "}
            <Link
              to="/cadastro"
              className="text-violet-400 hover:text-violet-300 transition-colors"
            >
              Criar agora
            </Link>
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="@seu_usuario"
                autoComplete="username"
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
                placeholder="••••••••"
                autoComplete="current-password"
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
              {carregando ? "Entrando…" : "Entrar"}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          © 2025 Kanban App. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
