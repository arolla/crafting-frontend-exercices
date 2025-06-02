import type { Preview } from '@storybook/web-components-vite'

import { initialize, mswLoader } from 'msw-storybook-addon'

/*
 * Initializes MSW
 * See https://github.com/mswjs/msw-storybook-addon#configuring-msw
 * to learn how to customize it
 */
initialize()

const preview: Preview = {
  // ... rest of preview configuration
  loaders: [mswLoader], // 👈 Add the MSW loader to all stories
}

export default preview
