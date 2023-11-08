import { defineConfig } from 'cypress';

export default defineConfig({
    component: {
        specPattern: 'test/**/*.cy.{js,jsx,ts,tsx}',
        devServer: {
            framework: 'react',
            bundler: 'vite',
        },
    },
});
