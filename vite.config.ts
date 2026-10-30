import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:12379',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      '@':  path.resolve(import.meta.dirname, "./src"),
      '@components': path.resolve(import.meta.dirname, './src/components'),
    }
  }
})
