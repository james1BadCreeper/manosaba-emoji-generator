import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// Use a production-only base so the dev server serves at '/'
const isProd = process.env.NODE_ENV === 'production'

// https://vite.dev/config/
export default defineConfig({
  base: isProd ? '/manosaba-emoji-generator/' : '/',
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
