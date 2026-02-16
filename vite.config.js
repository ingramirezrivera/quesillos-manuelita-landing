// vite.config.js
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const phpApiTarget = env.VITE_PHP_API_TARGET || "http://127.0.0.1:8000";

  return {
    plugins: [react()],
    // Para dominio propio usar "/". Si necesitas subcarpeta, define VITE_BASE_PATH.
    base: env.VITE_BASE_PATH || "/",
    server: {
      proxy: {
        "/api": {
          target: phpApiTarget,
          changeOrigin: true,
        },
      },
    },
  };
});
