import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const ASSET_URL = process.env.NODE_ENV === 'production'
    ? '/KampioensGok/'  // Match your GitHub Pages subdirectory
    : '';

// https://vitejs.dev/config/
export default defineConfig({
  base: `${ASSET_URL}`,
  server: {
    port: 3434,
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
