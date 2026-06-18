import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("view/login.tsx"),
  //route("login",    "view/login.tsx"),
  route("cadastro", "view/cadastro.tsx"),
  route("home",     "view/home.tsx"),
  route("*",        "view/not-found.tsx"),
] satisfies RouteConfig;
