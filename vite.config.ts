import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            external: [
                '@storybook/web-components-vite'
            ],
        }
    },
})
