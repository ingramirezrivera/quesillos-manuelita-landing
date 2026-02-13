// vite.config.js
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    // Para dominio propio usar "/". Si necesitas subcarpeta, define VITE_BASE_PATH.
    base: env.VITE_BASE_PATH || "/",
  };
});
