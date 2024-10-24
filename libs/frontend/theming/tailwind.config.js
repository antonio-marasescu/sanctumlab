module.exports = {
    darkMode: 'class',
    theme: {
        extend: {}
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
    daisyui: {
        themes: ['dracula', 'fantasy'],
        darkTheme: 'dracula'
    }
};
