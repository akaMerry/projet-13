import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/home.tsx", [
    index("routes/index.tsx"),
    route("/login", "routes/login.tsx"),
    route("/dashboard", "routes/dashboard.tsx"),
  ]),
] satisfies RouteConfig;
