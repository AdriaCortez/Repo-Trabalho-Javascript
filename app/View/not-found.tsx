import { isRouteErrorResponse, useRouteError, Link } from "react-router";

export function meta() {
  return [{ title: "Página não encontrada — Kanban" }];
}

export function ErrorBoundary() {
  const error = useRouteError();

  const status = isRouteErrorResponse(error) ? error.status : 500;
  const mensagem =
    status === 404
      ? "Página não encontrada"
      : status === 403
      ? "Acesso negado"
      : "Algo deu errado";

  const descricao =
    status === 404
      ? "A página que você procura não existe ou foi movida."
      : status === 403
      ? "Você não tem permissão para acessar este recurso."
      : "Ocorreu um erro inesperado. Tente novamente em alguns instantes.";

  return <ErroLayout status={status} mensagem={mensagem} descricao={descricao} />;
}

function ErroLayout({
  status,
  mensagem,
  descricao,
}: {
  status: number;
  mensagem: string;
  descricao: string;
}) {
  return (
    <div className="min-h-screen bg-[#0f1117] flex flex-col items-center justify-center px-4 text-center">
      {/* Fundo decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-violet-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-sm">
        {/* Número de erro */}
        <p className="text-[9rem] font-black leading-none text-white/5 select-none tabular-nums">
          {status}
        </p>

        {/* Ícone / acento */}
        <div className="-mt-10 mb-6 flex justify-center">
          <div className="w-16 h-16 bg-violet-600/15 border border-violet-500/20 rounded-2xl flex items-center justify-center">
            <span className="text-3xl">
              {status === 404 ? "🗺️" : status === 403 ? "🔒" : "⚡"}
            </span>
          </div>
        </div>

        <h1 className="text-white font-bold text-2xl mb-3">{mensagem}</h1>
        <p className="text-slate-400 text-sm leading-relaxed mb-8">{descricao}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/home"
            className="bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm rounded-xl px-6 py-3 transition-colors"
          >
            Ir para o quadro
          </Link>
          <Link
            to="/"
            className="bg-white/5 hover:bg-white/10 text-slate-300 text-sm rounded-xl px-6 py-3 transition-colors"
          >
            Voltar ao login
          </Link>
        </div>
      </div>
    </div>
  );
}

// Rota padrão de 404 (para quando não há error boundary)
export default function NotFound() {
  return (
    <ErroLayout
      status={404}
      mensagem="Página não encontrada"
      descricao="A página que você procura não existe ou foi movida."
    />
  );
}
