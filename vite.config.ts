import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import banner from 'vite-plugin-banner';
import { name, version, description, author, homepage, license } from './package.json';

export default defineConfig({
    plugins: [
        react({ jsxRuntime: 'classic' }),
        dts({ insertTypesEntry: true }),
        banner((fileName: string) =>
            fileName.match(/\.js$/)
                ? [
                      '/**',
                      ` * name: ${name}@${version}`,
                      ` * desc: ${description}`,
                      ` * author: ${author.name} <${author.email}> [${author.url}]`,
                      ` * homepage: ${homepage}`,
                      ` * license: ${license}`,
                      ' */',
                  ].join('\n')
                : null
        ),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'Spotlight',
            formats: ['es', 'umd'],
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            external: ['react'],
            output: {
                exports: 'named',
                globals: {
                    react: 'React',
                },
            },
        },
    },
});
