module.exports = {
    darkMode: ['class', '[data-theme="dark"]'],
    theme: {
        extend: {
            keyframes: {
                pop: {
                    '0%': { transform: 'scale(0.8)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' }
                }
            },
            animation: {
                pop: 'pop 0.3s ease-out'
            }
        }
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
    daisyui: {
        themes: ['dark', 'winter'],
        darkTheme: 'dark'
    }
};
