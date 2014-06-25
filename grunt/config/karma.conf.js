module.exports = function (config) {
    config.set({
        basePath: '../..',
        frameworks: ['mocha', 'sinon-chai'],
        browsers: ['PhantomJS'],
        port: 9876,
        colors: true,
        singleRun: true,
        files: [
            'js/jquery-1.11.1.min.js',
            'js/demo.js',
            'tests/*.js'
        ]
    });
}
