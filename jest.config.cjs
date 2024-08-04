module.exports = {
  moduleNameMapper: {
    '^.+/(.*\\.scss)\\?inline$': '<rootDir>/__mocks__/styleMock.ts',
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/?(*.)+(test).[t]s?(x)'],
  transform: {
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.ts',
  },
}
