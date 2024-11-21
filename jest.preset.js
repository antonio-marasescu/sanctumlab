const nxPreset = require('@nx/jest/preset').default;

module.exports = {
    ...nxPreset,
    collectCoverage: true,
    coverageThreshold: {
        global: {
            lines: 60
        }
    }
};
