const reporter = require("cucumber-html-reporter");
const fs = require("fs");
const path = require("path");

const options = {
  theme: "bootstrap",
  jsonFile: "report/cucumber_report.json",
  output: "report/cucumber_report.html",
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": "STAGING",
    Browser: "Chrome  89.0.4389.82",
    Platform: "Windows 10",
    Parallel: "Scenarios",
    Executed: "Remote",
  },
  screenshotsDirectory: "report/screenshots/",
  storeScreenshots: true,
};

reporter.generate(options);
