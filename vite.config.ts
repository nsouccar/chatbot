import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path"


export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app"),
    },
  },

  // ⬇️ ADD THESE
  ssr: {
    external: ["postgres", "perf_hooks"],
    noExternal: [], // keep empty unless needed for forced bundling
  },
  optimizeDeps: {
    exclude: ["postgres"], // prevent client build from touching it
  },
});