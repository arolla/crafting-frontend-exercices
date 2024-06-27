
module.exports = {
  async viteFinal(config, { configType }) {
    const { mergeConfig } = await import('vite');
    return mergeConfig(config, {
      optimizeDeps: {
        include: [...(config.optimizeDeps?.include ?? []), '@storybook/web-components', 'lit-html', 'lit'],
      }
    });
  },
  framework: '@storybook/web-components-vite',
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  features: {
    storyStoreV7: true
  },
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-controls"
  ],
  core: {
    builder: '@storybook/builder-vite'
  },
  docs: {
    autodocs: true
  }
}
