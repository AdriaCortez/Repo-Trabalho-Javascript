import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { ToastContainer } from "./alerts/toasts";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        {/* ToastContainer global — renderiza os alertas em qualquer página */}
        <ToastContainer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let status = 500;
  let mensagem = "Algo deu errado";
  let descricao = "Ocorreu um erro inesperado.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    status = error.status;
    if (status === 404) {
      mensagem = "Página não encontrada";
      descricao = "A página que você procura não existe ou foi movida.";
    } else {
      mensagem = "Erro";
      descricao = error.statusText || descricao;
    }
  } else if (import.meta.env.DEV && error instanceof Error) {
    descricao = error.message;
    stack = error.stack;
  }

  return (
    <div className="min-h-screen bg-[#0f1117] flex flex-col items-center justify-center px-4 text-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-violet-600/5 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-sm">
        <p className="text-[9rem] font-black leading-none text-white/5 select-none tabular-nums">
          {status}
        </p>
        <div className="-mt-10 mb-6 flex justify-center">
          <div className="w-16 h-16 bg-violet-600/15 border border-violet-500/20 rounded-2xl flex items-center justify-center">
            <span className="text-3xl">{status === 404 ? "🗺️" : "⚡"}</span>
          </div>
        </div>
        <h1 className="text-white font-bold text-2xl mb-3">{mensagem}</h1>
        <p className="text-slate-400 text-sm leading-relaxed mb-8">{descricao}</p>
        {stack && import.meta.env.DEV && (
          <pre className="text-left text-xs text-red-400 bg-red-500/5 border border-red-500/20 rounded-xl p-4 overflow-x-auto mb-6 max-h-48">
            {stack}
          </pre>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/home" className="bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm rounded-xl px-6 py-3 transition-colors">
            Ir para o quadro
          </Link>
          <Link to="/login" className="bg-white/5 hover:bg-white/10 text-slate-300 text-sm rounded-xl px-6 py-3 transition-colors">
            Voltar ao login
          </Link>
        </div>
      </div>
    </div>
  );
}
