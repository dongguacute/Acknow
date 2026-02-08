import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  build: {
    outDir: resolve(__dirname, '../../dist/frontend'),
    emptyOutDir: true,
  },
  plugins: [reactRouter(), tsconfigPaths()],
});
