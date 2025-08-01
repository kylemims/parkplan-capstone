import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server: {
    port: 5173, // optional: customize your local dev port
  },
  base: "/", // ensures correct asset loading on Netlify
});
