import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/** Static build for GitHub Pages. Not used by the live preview. */
export default defineConfig({
  base: "./",
  mode: "pages",
  resolve: { tsconfigPaths: true },
  plugins: [tailwindcss(), react()],
  build: {
    outDir: "dist-pages",
    emptyOutDir: true,
    rollupOptions: {
      input: "pages/index.html",
    },
  },
});
