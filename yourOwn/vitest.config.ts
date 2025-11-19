/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: [
      'apps/server/src/**/*.{test,spec}.ts',
      'apps/server/tests/**/*.{test,spec}.ts',
      'src/**/*.{test,spec}.ts'
    ],
    coverage: {
      provider: 'v8',
      reportsDirectory: 'coverage',
      reporter: ['text', 'html', 'lcov'],
      all: true,
      include: ['apps/server/src/**/*.ts', 'src/**/*.ts'],
      exclude: ['**/*.d.ts', '**/__tests__/**', '**/index.ts'],
      lines: 80, functions: 80, branches: 70, statements: 80
    }
  }
});
