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
        ]
    });
};
