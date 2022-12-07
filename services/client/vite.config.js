import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  console.log('ENV CLIENT VITE', env)

  return {
    plugins: [react()],
    server: {
      port: env.CLIENT_PORT,
      host: env.CLIENT_IP
    },
    test: {
      environment: 'jsdom',
      globals: true,
      transformMode: {
        web: [/\.[jt]sx?$/],
      },
      setupFiles: './setupVitest.js',
      // if you have few tests, try commenting one
      // or both out to improve performance:
      threads: false,
      isolate: false,
    },
    resolve: {
      conditions: ['development', 'browser'],
    },
    build: {
      target: 'esnext',
    }
  }
})
