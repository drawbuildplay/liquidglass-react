import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import dts from 'vite-plugin-dts';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

const dirname = typeof __dirname !== 'undefined' ? __dirname : resolve(fileURLToPath(import.meta.url), '..');

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(dirname, 'src/index.ts'),
      name: 'LiquidGlassReact',
      fileName: 'liquid-glass-react',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
      },
    },
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
        storybookTest({
          configDir: resolve(dirname, '.storybook')
        })
      ],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['.storybook/vitest.setup.ts']
      }
    }]
  }
});