import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: './index.ts',
      name: 'RnmuTheme',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-native', 'react-dom'],
    },
    minify: false,
  },
});
