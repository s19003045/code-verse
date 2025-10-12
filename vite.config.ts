import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@world': '/src/world',
      '@store': '/src/store',
      '@theme': '/src/theme',
      '@types': '/src/types',
      '@hooks': '/src/hooks',
      '@data': '/src/data',
      '@static': '/data'
    }
  },
  server: {
    host: true,
    port: 5173
  },
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          state: ['zustand'],
          media: ['howler']
        }
      }
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['/src/test/setup-tests.ts'],
    exclude: ['src/test/e2e/**', 'node_modules/**', 'dist/**'],
    coverage: {
      reporter: ['text', 'html'],
      thresholds: {
        statements: 80,
        branches: 70,
        functions: 80,
        lines: 80
      }
    }
  }
});
