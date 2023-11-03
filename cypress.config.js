const { defineConfig } = require("cypress");

module.exports = defineConfig({
    plugins: [require('flowbite/plugin')],
    content: [
        './src/**/*.{ts,tsx,html,cy.js}',
        './node_modules/flowbite/**/*.js',
    ],
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
