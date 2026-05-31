import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, './src/style') } },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          '@use "@/mixins.scss" as *;@use "@/placeholders.scss" as *;@use "@/variables.scss" as *;'
      }
    }
  }
})
