import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',      // 👈 exposes to LAN / external
    port: 5173, 
    allowedHosts: [
      "https://sabas1-4.onrender.com/" // 👈 add your domain/host here
    ],

    hmr: {
      host: 'teamsabas.baazsmp.fun',
      protocol: 'wss',
      clientPort: 443,
    }
  
  }
})