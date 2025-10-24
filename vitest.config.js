import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,              // para usar describe, it, expect sin importar
    environment: 'jsdom',       // simula el DOM en Node
    setupFiles: './src/tests/setup.js',  // archivo que se ejecuta antes de los tests
    coverage: {
      reporter: ['text', 'html'],  // para ver cobertura en consola y HTML
    },
  },
});
