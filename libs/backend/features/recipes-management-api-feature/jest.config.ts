/* eslint-disable */
export default {
    displayName: 'recipes-management-api-feature',
    preset: '../../../../jest.preset.js',
    testEnvironment: 'node',
    transform: {
        '^.+\\.[tj]s$': [
            'ts-jest',
            { tsconfig: '<rootDir>/tsconfig.spec.json' }
        ]
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory:
        '../../../../coverage/libs/backend/features/recipes-management-api-feature'
};