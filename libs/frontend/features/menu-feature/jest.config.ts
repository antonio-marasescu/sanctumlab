/* eslint-disable */
export default {
    displayName: 'menu-feature',
    preset: '../../../../jest.preset.js',
    setupFilesAfterEnv: ['jest-canvas-mock', '<rootDir>/src/test-setup.ts'],
    coverageDirectory:
        '../../../../coverage/libs/frontend/features/menu-feature',
    transform: {
        '^.+\\.(ts|mjs|js|html)$': [
            'jest-preset-angular',
            {
                tsconfig: '<rootDir>/tsconfig.spec.json',
                stringifyContentPathRegex: '\\.(html|svg)$'
            }
        ]
    },
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
    snapshotSerializers: [
        'jest-preset-angular/build/serializers/no-ng-attributes',
        'jest-preset-angular/build/serializers/ng-snapshot',
        'jest-preset-angular/build/serializers/html-comment'
    ]
};
