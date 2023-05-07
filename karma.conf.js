// Example of a typical configuration
module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage-istanbul-reporter"),
      require("karma-coverage"),
      require("karma-sonarqube-reporter"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    client: {
      clearContext: false,
    },
    coverageReporter: {
      dir: "coverage",
      subdir: ".",
      reporters: [{ type: "lcov" }],
      check: {
        global: {
          statements: 15,
          branches: 15,
          functions: 15,
          lines: 15,
        },
      },
    },
    coverageIstanbulReporter: {
      reports: ["html", "lcovonly", "text-summary"],

      fixWebpackSourcePaths: true,
    },
    sonarqubeReporter: {
      basePath: "src/app",
      outputFolder: "reports",
      filePattern: "**/*spec.ts",
      encoding: "utf-8",
      legacyMode: false,
      reportName: (metadata) => {
        return "test-report.xml";
      },
    },
    angularCli: {
      environment: "dev",
    },
    reporters: ["progress", "kjhtml", "sonarqube"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["ChromeHeadless"],
    singleRun: false,
  });
};
