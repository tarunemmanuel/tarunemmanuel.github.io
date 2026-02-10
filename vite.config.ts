import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", 

  build: {
    outDir: "docs",   // GitHub Pages from main /docs
    sourcemap: false,
    emptyOutDir: true,
  },

  server: {
    port: 5173,
    open: true,
  },

  preview: {
    port: 4173,
  },
});
