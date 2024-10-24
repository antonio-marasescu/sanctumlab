import type { Preview } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideInputValidationConfiguration } from '../src/lib/config/input-validation.config';
import { provideIcons } from '@ng-icons/core';
import { matLocalGroceryStoreRound } from '@ng-icons/material-icons/round';
import { matLocalBar, matMenu } from '@ng-icons/material-icons/baseline';

const preview: Preview = {
    decorators: [
        applicationConfig({
            providers: [
                provideIcons({
                    matLocalGroceryStoreRound,
                    matLocalBar,
                    matMenu
                }),
                provideInputValidationConfiguration({
                    errors: {
                        required: () => 'This field is required',
                        minlength: ({
                            requiredLength
                        }: {
                            requiredLength: number;
                        }) => `The required length is ${requiredLength}`,
                        email: () => `Invalid email address format`
                    }
                })
            ]
        })
    ],
    parameters: {
        backgrounds: {
            values: [
                { name: 'Dark', value: '#333' },
                { name: 'Light', value: '#F7F9F2' },
                { name: 'Blue', value: '#005be1' },
                { name: 'Purple', value: '#6d00e1' },
                {
                    name: 'Gradient',
                    value: 'linear-gradient(45deg, #005be1, #6d00e1)'
                }
            ],
            default: 'Light'
        }
    }
};

export default preview;
