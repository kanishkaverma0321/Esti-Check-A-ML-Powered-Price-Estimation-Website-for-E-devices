import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Esti-Check-A-ML-Powered-Price-Estimation-Website-for-E-devices/',  // 👈 Add this
  plugins: [react()],
})
