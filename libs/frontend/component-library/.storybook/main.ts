import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
    stories: ['../**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
    addons: ['@storybook/addon-essentials'],
    staticDirs: [{ from: 'assets', to: '/assets' }],
    framework: {
        name: '@storybook/angular',
        options: {}
    }
};

export default config;
