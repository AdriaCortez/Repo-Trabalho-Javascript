import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("View/home.view.tsx"),
  route("login", "routes/APICalls/login.service.tsx"),
  route("cadastro", "routes/APICalls/cadastro.service.tsx"),
  route("tarefas", "routes/APICalls/tarefas.service.tsx"),
  route("trocar-senha", "routes/APICalls/trocarSenha.service.tsx"),
  route("desativado", "routes/APICalls/contaDesativada.service.tsx"),
  route("configuracoes", "View/configuracoesDeUsuario.view.tsx"),
] satisfies RouteConfig;
