module.exports = function (config) {
    config.set({
        basePath: '../..',
        frameworks: ['mocha', 'sinon-chai', 'jquery-1.11.1'],
        browsers: ['Chrome'],
        port: 9876,
        colors: true,
        singleRun: true,
        files: [
            'css/demo.css',
            'js/demo.js',
            'tests/*.js'
        ],
        reporters: ['progress', 'coverage'],
        preprocessors: {
            'js/demo.js': ['coverage']
        },
        coverageReporter: {
            type: 'text-summary',
            dir: 'tests/coverage/',
            file: 'coverage.txt'
        }
    });
};
