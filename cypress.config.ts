import { defineConfig } from "cypress";
const merge = require("mochawesome-merge");
const generator = require("mochawesome-report-generator");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("after:run", async (results) => {
        const mergedReport = await merge(results);
        await generator.create(mergedReport, { 
          reportDir: "cypress/reports",
        });
      });
    },
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      reportFilename: "report",
      overwrite: false,
      html: false,
      json: true
    },
    baseUrl: 'https://dummyjson.com',
    specPattern: 'cypress/integration/**/*.ts',
    supportFile: 'cypress/support/commands.ts'
  },
});
