import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['*.zip','*.gif'],
  build: {
    outDir: 'dist',
    assetsInlineLimit:624640,
    chunkSizeWarningLimit:610
  },
  plugins: [react()],
  server: {
    open: true,
    port: 8000,
  },
});
