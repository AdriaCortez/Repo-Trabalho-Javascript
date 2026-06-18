import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("view/home.tsx"),

    route("/login", "view/login.tsx"),
] satisfies RouteConfig;
