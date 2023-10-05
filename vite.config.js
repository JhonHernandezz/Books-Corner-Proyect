import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { my_config } from './helpers/config/variables.js'

let env = loadEnv("development", process.cwd(), "VITE")

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: env.VITE_PORT_FRONTEND, 
    host: my_config.hostname
  }
})
