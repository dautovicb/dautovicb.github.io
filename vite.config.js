import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  base: "./",
  assetsInclude: ["**/*.PNG", "**/*.MOV"],
  build: {
    rollupOptions: {
      input: {
        support: fileURLToPath(new URL("./support/index.html", import.meta.url)),
        portfolio: fileURLToPath(new URL("./index.html", import.meta.url)),
        bakeItBigPrivacy: fileURLToPath(new URL("./bake-it-big-privacy-policy/index.html", import.meta.url)),
        privacy: fileURLToPath(new URL("./consciousness-privacy-policy/index.html", import.meta.url)),
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: false,
  },
});
