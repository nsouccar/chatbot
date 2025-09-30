import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import "./app.css";
import type { Route } from "./+types/root";




export default function App({ loaderData }: Route.ComponentProps) {

  return (
    <>
      <Outlet />


    </>

  )
}

