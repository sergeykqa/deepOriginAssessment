const webpackPreprocessor = require('@cypress/webpack-dev-server');

module.exports = (on, config) => {
    on('file:preprocessor', webpackPreprocessor())
    // ... any other existing plugins configuration
    return config;
}