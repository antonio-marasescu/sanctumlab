module.exports = {
    darkMode: ['class', '[data-theme="dark"]'],
    theme: {
        extend: {}
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/line-clamp'),
        require('daisyui')
    ],
    daisyui: {
        themes: ['dark', 'winter'],
        darkTheme: 'dark'
    }
};
