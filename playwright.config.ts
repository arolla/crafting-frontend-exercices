import {
  type PlaywrightTestConfig,
  defineConfig,
  devices,
} from '@playwright/test'
import { config } from 'dotenv'
import { isCI } from 'std-env'

config({ path: '.env.local' })
config({ path: '.env.test' })
config({ path: '.env' })

const { PLAYWRIGHT_BASE_URL } = process.env

const buildPwConfig = (): PlaywrightTestConfig => {
  const baseURL = PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000'
  const projects = [
    {
      name: 'chromium',
      use: devices['Desktop Chrome'],
    },
  ]
  const reporter: PlaywrightTestConfig['reporter'] = isCI
    ? [['list']]
    : [['html', { outputFolder: './dist/test/e2e/html-report' }]]
  const retries = isCI ? 2 : 0
  const workers = isCI ? 1 : undefined
  const webServer = !PLAYWRIGHT_BASE_URL
    ? {
        command: 'npm start',
        url: baseURL,
        reuseExistingServer: false,
      }
    : undefined
  console.log('webServer:', webServer)
  return {
    forbidOnly: isCI,
    outputDir: './dist/test/e2e/results',
    projects,
    reporter,
    respectGitIgnore: true,
    retries,
    testDir: './test/e2e',
    use: {
      baseURL,
      trace: 'on-first-retry',
    },
    webServer,
    workers,
  }
}

export default defineConfig(buildPwConfig())
