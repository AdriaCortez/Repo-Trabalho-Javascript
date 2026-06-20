"use client";

import { useState, useEffect, useCallback } from "react";

// ─── Tipos ────────────────────────────────────────────────────────────────────
type TipoToast = "ok" | "erro" | "aviso";

interface ToastItem {
  id: number;
  mensagem: string;
  tipo: TipoToast;
}

// ─── Estado global simples (sem Redux/Context) ────────────────────────────────
let listeners: ((t: ToastItem) => void)[] = [];
let nextId = 0;

function dispararToast(mensagem: string, tipo: TipoToast) {
  const toast: ToastItem = { id: nextId++, mensagem, tipo };
  listeners.forEach((fn) => fn(toast));
}

// ─── Funções exportadas (igual ao padrão da Adria: ok('msg')) ────────────────
export function ok(mensagem: string) {
  dispararToast(mensagem || "Operação realizada com sucesso!", "ok");
}

export function erro(mensagem: string) {
  dispararToast(mensagem || "Ocorreu um erro.", "erro");
}

export function aviso(mensagem: string) {
  dispararToast(mensagem || "Atenção.", "aviso");
}

// ─── Cores por tipo ───────────────────────────────────────────────────────────
const ESTILO: Record<TipoToast, { barra: string; icone: string; bg: string; borda: string }> = {
  ok:    { barra: "bg-emerald-500", icone: "✓", bg: "bg-[#16181f]", borda: "border-emerald-500/30" },
  erro:  { barra: "bg-red-500",     icone: "✕", bg: "bg-[#16181f]", borda: "border-red-500/30"     },
  aviso: { barra: "bg-amber-500",   icone: "!", bg: "bg-[#16181f]", borda: "border-amber-500/30"   },
};

// ─── Componente Toast individual ──────────────────────────────────────────────
function ToastCard({ toast, onRemover }: { toast: ToastItem; onRemover: (id: number) => void }) {
  const e = ESTILO[toast.tipo];

  useEffect(() => {
    const t = setTimeout(() => onRemover(toast.id), 4000);
    return () => clearTimeout(t);
  }, [toast.id, onRemover]);

  return (
    <div
      className={`flex items-center gap-3 ${e.bg} border ${e.borda} rounded-xl shadow-2xl overflow-hidden min-w-[260px] max-w-sm animate-slide-in`}
    >
      <div className={`w-1 self-stretch ${e.barra} shrink-0`} />
      <span className={`text-sm font-bold ${e.barra.replace("bg-", "text-")}`}>{e.icone}</span>
      <p className="text-white text-sm py-3 pr-3 flex-1">{toast.mensagem}</p>
      <button
        onClick={() => onRemover(toast.id)}
        className="text-slate-500 hover:text-white pr-3 transition-colors text-xs"
      >
        ✕
      </button>
    </div>
  );
}

// ─── Container global de Toasts — coloque em root.tsx ────────────────────────
export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    function handler(t: ToastItem) {
      setToasts((prev) => [...prev, t]);
    }
    listeners.push(handler);
    return () => {
      listeners = listeners.filter((fn) => fn !== handler);
    };
  }, []);

  const remover = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2">
      {toasts.map((t) => (
        <ToastCard key={t.id} toast={t} onRemover={remover} />
      ))}
    </div>
  );
}
