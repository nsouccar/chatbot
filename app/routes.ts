import { type RouteConfig, index } from "@react-router/dev/routes";
import { route } from "@react-router/dev/routes";

export default [
    route("signup", "handlers/Signup.tsx"),
    route("/", "handlers/home.tsx"),
    route("welcome", "handlers/Welcome.tsx"),
    route("login", "handlers/Login.tsx"),
    route("api/chat", "handlers/chat.ts"),
    route("chatui", "handlers/chatui.tsx")
] satisfies RouteConfig


