import type { Route } from "./+types/index";
import HomePage from "../View/home.view";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Notticks" },
    { name: "description", content: "Plataforma de gerenciamento de tarefas" },
  ];
}

export default function Home() {
  return <HomePage />;
}
