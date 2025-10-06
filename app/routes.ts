import { type RouteConfig, index } from "@react-router/dev/routes";
import { route } from "@react-router/dev/routes";

export default [
    route("signup", "handlers/Signup.tsx"),
    route("/", "handlers/Login.tsx"),
    route("welcome", "handlers/Welcome.tsx"),
    route("chat/:role", "../server/chat.ts"),
    route("chatui/:role", "handlers/chatui.tsx"),
    route("chatstream/:role", "../server/chatStream.ts"),
    route("getStuff", "../server/getStuff.ts")
] satisfies RouteConfig


