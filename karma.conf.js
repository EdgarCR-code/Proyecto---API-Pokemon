// karma.conf.js
// Configuración completa para Mocha + Chai + Sinon + Chrome + ES Modules

const path = require('path');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'sinon'],

    files: [
      { pattern: 'src/**/*.js', watched: false },
      { pattern: 'test/**/*.spec.js', watched: false }
    ],


    exclude: [],

    preprocessors: {
      'src/**/*.js': ['webpack'],
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
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', { targets: { chrome: '90' } }]]
              }
            }
          }
        ]
      },
      resolve: {
        extensions: ['.js']
      }
    },

    webpackMiddleware: {
      stats: 'errors-only'
    },

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,

    browsers: ['ChromeHeadless'], // Usa Chrome sin interfaz
    singleRun: true,
    concurrency: Infinity
  });
};
