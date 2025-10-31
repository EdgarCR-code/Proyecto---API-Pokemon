// Karma configuration
module.exports = function(config) {
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
      'test/chai-setup.js',
      { pattern: 'src/**/*.js', watched: true },
      { pattern: 'test/**/*.spec.js', watched: true }
    ],

    // Excluimos los estilos para que no afecten coverage
    exclude: [
      '**/*.styles.js',
      './src/components/list/poke-list-styles.js',
      './src/components/form/form-styles.js',
      './src/components/modal/modal-styles.js'
    ],

    preprocessors: {
      'test/**/*.spec.js': ['webpack'],
      'src/**/*.js': ['webpack', 'coverage']
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
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      },
      resolve: { extensions: ['.js'] }
    },

    webpackMiddleware: { stats: 'errors-only' },

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: '.', file: 'index.html' }, // HTML visualizable en navegador
        { type: 'text-summary' } // Resumen en consola
      ],
      check: {
        global: {
          statements: 100,
          branches: 75,
          functions: 100,
          lines: 100
        }
      },
      
      watermarks: {
        statements: [50, 80],
        functions: [50, 80],
        branches: [50, 75],
        lines: [50, 80]
      }
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,

    autoWatch: false,
    singleRun: true,
    concurrency: Infinity,

    browsers: ['Chrome']
  });
};
