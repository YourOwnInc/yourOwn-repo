// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  // Pick the roots that actually contain your server code & tests:
  roots: [
    '<rootDir>/apps/server/src',
    '<rootDir>/apps/server/tests',
    '<rootDir>/src',                  // keep if you also run from /src
    '<rootDir>/tests'
  ],

  // If you use path aliases, map them here:
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/apps/server/src/$1',
  },

  // Coverage you can crank later
  collectCoverage: true,
  collectCoverageFrom: [
    'apps/server/src/**/*.ts',
    'src/**/*.ts',
    '!**/*.d.ts',
    '!**/index.ts',
    '!**/routes/**',
    // include repos if you want repo-level coverage too (uncomment below)
    // '!**/repositories/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      lines: 80,
      statements: 80,
      functions: 80,
      branches: 70,
    },
  },
};

export default config;
