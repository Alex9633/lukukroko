// Vite setup: React support, and the build output in build/, the folder npm run deploy publishes.
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: { outDir: "build" },
});
