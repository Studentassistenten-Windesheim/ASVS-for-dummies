/** @type {import('tailwindcss').Config} */
module.exports = {

    plugins: [require('flowbite/plugin')],
    corePlugins: {
        preflight: true,
    },
    content: [
        './src/**/*.{ts,tsx,html,cy.js}',
        './node_modules/flowbite/**/*.js',
    ],

    theme: {
        extend: {},
    }
}
