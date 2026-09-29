import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from https://<user>.github.io/restro/
export default defineConfig({
  plugins: [react()],
  base: '/restro/',
})
