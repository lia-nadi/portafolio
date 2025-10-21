import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/portafolio/', // Reemplaza TU_REPO por el nombre de tu repositorio de GitHub
  plugins: [react()],
})
