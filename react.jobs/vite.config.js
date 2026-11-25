import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    // json-server escribe en jobs.json al añadir/borrar; si vite lo vigila, 
    // recarga la pagina entera y se pierde el toast
    watch: {
      ignored: ['**/jobs.json'],
    },
    proxy:{
      '/api':{
        target: 'htpp://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})