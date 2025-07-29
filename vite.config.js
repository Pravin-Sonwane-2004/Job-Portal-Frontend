import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
      host: true,   // important!
    port: 3000,
        watch: {
      usePolling: true,    // 👈 required for Docker volume
    }
  },
  css: {
    postcss: './postcss.config.js'
  }
})
