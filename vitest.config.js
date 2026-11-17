import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: ['**/app.spec.js', '**/node_modules/**'],
    environment: 'jsdom'
  }
});