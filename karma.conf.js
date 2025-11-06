module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'sinon', 'webpack'],
    plugins: [
      'karma-mocha',
      'karma-sinon',
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-coverage'
    ],
    files: [
      { pattern: 'test/**/*.spec.js', watched: false }
    ],
    preprocessors: {
      'test/**/*.spec.js': ['webpack']
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
              // ⚠️ no pongas aquí el plugin istanbul, ya lo maneja babel.config.json
            }
          }
        ]
      }
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: '.' },
        { type: 'text-summary' }
      ]
    },
    browsers: ['ChromeHeadless'],
    singleRun: true
  });
};
