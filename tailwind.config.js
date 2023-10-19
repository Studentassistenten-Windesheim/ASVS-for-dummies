/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: true,
  },
  content: [
      './src/**/*.{ts,tsx,html}',
      './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {},
  },
    plugins: [
        require('flowbite/plugin')
    ]
}
