import type { Config } from 'jest'

const config: Config = {
  coverageDirectory: 'dist/test-coverage',
  moduleNameMapper: {
    '^.+/(.*\\.scss)\\?inline$': '<rootDir>/__mocks__/style.mock.ts',
    '^@assets/(.*)$': '<rootDir>/__mocks__/file.mock.ts',
    '^@api/(.*)$': '<rootDir>/src/api/$1',
    '^@business/(.*)$': '<rootDir>/src/business/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@config$': '<rootDir>/src/config',
    '^@mappers/(.*)$': '<rootDir>/src/mappers/$1',
    '^@models/(.*)$': '<rootDir>/src/models/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@util/(.*)$': '<rootDir>/src/util/$1',
  },
  passWithNoTests: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  transform: {
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/file.mock.ts',
  },
}

export default config
