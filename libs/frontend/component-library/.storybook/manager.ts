import customTheme from './custom-theme';
import { addons } from '@storybook/manager-api';

addons.setConfig({
    theme: customTheme
});
