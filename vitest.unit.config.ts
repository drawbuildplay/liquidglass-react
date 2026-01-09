import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        include: ['src/**/*.test.tsx'],
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/test/setup.ts'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: ['src/components/**/*.tsx'],
            exclude: ['src/**/*.stories.tsx', 'src/**/*.test.tsx', 'src/examples/**']
        }
    }
});
