import type { Preview } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideInputValidationConfiguration } from '../src/lib/config/input-validation.config';
import { provideIcons } from '@ng-icons/core';
import { matLocalGroceryStoreRound } from '@ng-icons/material-icons/round';
import {
    matArrowDropUp,
    matArrowForward,
    matClose,
    matDelete,
    matLocalBar,
    matLock,
    matMenu,
    matMouse,
    matPlus,
    matQrCode,
    matRemove,
    matWallpaper,
    matWarning
} from '@ng-icons/material-icons/baseline';
import { provideQuillConfig } from 'ngx-quill';
import { validationConfigFactory } from './custom-validation';
import { provideInternationalization } from './custom-internationalization';

const preview: Preview = {
    decorators: [
        applicationConfig({
            providers: [
                provideIcons({
                    matLocalGroceryStoreRound,
                    matLocalBar,
                    matMenu,
                    matClose,
                    matDelete,
                    matRemove,
                    matPlus,
                    matWallpaper,
                    matLock,
                    matMouse,
                    matWarning,
                    matQrCode
                }),
                provideInputValidationConfiguration(validationConfigFactory()),
                provideInternationalization(),
                provideQuillConfig({
                    theme: 'snow',
                    modules: {
                        syntax: false,
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                            ['blockquote', 'code-block'],
                            [{ header: 1 }, { header: 2 }], // custom button values
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
                            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
                            [{ direction: 'rtl' }], // text direction
                            [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
                            [{ header: [1, 2, 3, 4, 5, 6, false] }],
                            [{ align: [] }],
                            ['clean']
                        ]
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
