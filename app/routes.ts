import { type RouteConfig, index } from "@react-router/dev/routes";
import { route } from "@react-router/dev/routes";

export default [
    route("signup", "client/Signup.tsx"),
    route("/", "client/home.tsx")
] satisfies RouteConfig


