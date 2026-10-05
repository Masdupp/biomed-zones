/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

// Dev proxy mirrors the nginx gateway routes (ADR-0010).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.API_PROXY ?? 'http://localhost:3001',
        rewrite: (p) => p.replace(/^\/api/, ''),
      },
      '/ml': {
        target: process.env.ML_PROXY ?? 'http://localhost:8001',
        rewrite: (p) => p.replace(/^\/ml/, ''),
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    // JUnit output feeds docs/TEST_REPORT.md (scripts/test-report.mjs).
    reporters: ['default', 'junit'],
    outputFile: { junit: '../../reports/junit/web.xml' },
  },
});
