import type { IncomingMessage, ServerResponse } from 'node:http'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { type UserConfig, defineConfig } from 'vite'
import EnvironmentPlugin from 'vite-plugin-environment'
import { gamesApiResponse } from './src/api/games.response'
import { oddsApiResponse } from './src/api/odds.response'

const rootDir = fileURLToPath(new URL('.', import.meta.url))
const srcDir = join(rootDir, 'src')

const proxyBypassJson =
  (content: unknown) =>
  (_req: IncomingMessage, res: ServerResponse<IncomingMessage> | undefined) => {
    if (!res) {
      return
    }
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(content))
    return false
  }

export const viteConfig: UserConfig = {
  plugins: [EnvironmentPlugin(['VERBOSE'])],
  resolve: {
    alias: [
      {
        find: '@assets',
        replacement: join(rootDir, 'assets'),
      },
      {
        find: '@api',
        replacement: join(srcDir, 'api'),
      },
      {
        find: '@business',
        replacement: join(srcDir, 'business'),
      },
      {
        find: '@components',
        replacement: join(srcDir, 'components'),
      },
      {
        find: '@config',
        replacement: join(srcDir, 'config'),
      },
      {
        find: '@mappers',
        replacement: join(srcDir, 'mappers'),
      },
      {
        find: '@models',
        replacement: join(srcDir, 'models'),
      },
      {
        find: '@pages',
        replacement: join(srcDir, 'pages'),
      },
      {
        find: '@services',
        replacement: join(srcDir, 'services'),
      },
      {
        find: '@shared',
        replacement: join(srcDir, 'shared'),
      },
      {
        find: '@util',
        replacement: join(srcDir, 'util'),
      },
    ],
  },
  server: {
    port: 3000,
    proxy: {
      '/api/games': {
        bypass: proxyBypassJson(gamesApiResponse),
      },
      '/api/odds': {
        bypass: proxyBypassJson(oddsApiResponse),
      },
    },
  },
}

export default defineConfig(viteConfig)
