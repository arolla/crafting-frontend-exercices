import { defineConfig } from 'vite'

// biome-ignore lint/style/noDefaultExport: <explanation>
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['@storybook/web-components-vite'],
    },
  },
  server: {
    port: 3000,
  },
})
