/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',

  // ESM Support for ts-jest
  extensionsToTreatAsEsm: ['.ts'],

  // ESM Support for ts-jest
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },

  // The basic ts-jest preset
  preset: 'ts-jest',

  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: ['jest-canvas-mock'],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['./setup-jest.ts'],

  // The test environment that will be used for testing
  testEnvironment: 'jest-environment-jsdom',
};
