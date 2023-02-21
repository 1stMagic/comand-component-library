import { fileURLToPath, URL } from 'node:url'

import { resolve } from "path"
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from "unplugin-vue-components/vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Components()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "comand-component-library",
      fileName: "comand-component-library"
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  }
})
