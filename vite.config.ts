import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

//https://vitejs.dev/config/
export default defineConfig({
  base: '/Esti-Check-A-ML-Powered-Price-Estimation-Website-for-E-devices/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
