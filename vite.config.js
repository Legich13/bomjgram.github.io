import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vitePluginYopta } from './plugins/vitePluginYopta.js';

export default defineConfig({
  base: '/bomjgram.github.io/',
  plugins: [vitePluginYopta(), react()],
  build: {
    target: 'esnext',
    sourcemap: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});
