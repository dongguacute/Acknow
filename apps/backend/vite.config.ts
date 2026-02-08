import { defineConfig } from 'vite'
import devServer from '@hono/vite-dev-server'

import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    minify: true,
    ssr: true,
    rollupOptions: {
      input: resolve(__dirname, 'src/index.ts'),
      external: ['__STATIC_CONTENT_MANIFEST'],
    output: {
        entryFileNames: 'index.js',
        format: 'es',
      },
    },
    outDir: resolve(__dirname, '../../dist/server'),
    emptyOutDir: true,
  },
  plugins: [
    devServer({
      entry: 'src/index.ts',
    }),
  ],
})
