import { defineConfig, type Plugin } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { handleDevApiRequest } from './server/devApiMiddleware.ts'

const truthDevApiPlugin = (): Plugin => ({
  name: 'truth-dev-api',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url && req.url.startsWith('/api/')) {
        await handleDevApiRequest(req, res, next)
      } else {
        next()
      }
    })
  },
})

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    truthDevApiPlugin(),
  ],
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    watch: {
      ignored: [
        '**/server/**',
        '**/scripts/**',
        '**/tests/**',
        '**/test-results/**',
        '**/public/**',
        '**/*.json',
        '**/.system_generated/**',
        '**/scratch/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
})
