import { defineConfig } from 'vite'
import { viteConfig } from './vite.config'

export default defineConfig({
  ...viteConfig,
  server: {
    open: '/css-exercise.html',
    port: 3006,
  },
})
