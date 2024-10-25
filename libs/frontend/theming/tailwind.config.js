module.exports = {
    darkMode: ['class', '[data-theme="dark"]'],
    theme: {
        extend: {}
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
    daisyui: {
        themes: ['dark', 'corporate'],
        darkTheme: 'dark'
    }
};
