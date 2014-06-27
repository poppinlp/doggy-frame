module.exports = function (config) {
    config.set({
        basePath: '../..',
        frameworks: ['mocha', 'sinon-chai'],
        browsers: ['Chrome'],
        port: 9876,
        colors: true,
        singleRun: true,
        files: [
            'css/demo.css',
            'js/jquery-1.11.1.min.js',
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
