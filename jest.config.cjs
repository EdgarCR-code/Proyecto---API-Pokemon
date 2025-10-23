module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@open-wc|@esm-bundle)/)"
  ],
  moduleFileExtensions: ["js", "mjs"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  verbose: true
};
