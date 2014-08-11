module.exports = function(grunt) {
    var configObj = {},
        STATIC_PATH = './';

    // sass
    configObj.sass = {
        dist: {
            options: {
                style: 'compressed',
                banner: '/* Please do not change this file. It is made by sass. */',
                sourcemap: true,
                trace: true
            },
            files: [{
                expand: true,
                cwd: STATIC_PATH + 'src/sass',
                src: '*.scss',
                dest: STATIC_PATH + 'css',
                ext: '.css'
            }]
        }
    };

    // imagemin
    configObj.imagemin = {
        dynamic: {
            files: [{
                expand: true,
                cwd: STATIC_PATH + 'src/img/',
                src: ['*.{png,jpg,gif}'],
                dest: STATIC_PATH + 'img/'
            }]
        }
    };

    // htmlmin
    configObj.htmlmin = {
        dist: {
            options: {
                removeComments: true,
                collapseWhitespace: true,
                removeCommentsFromCDATA: true
            },
            files: {
                src: '**/*.html',
                dest: STATIC_PATH + 'templates/',
                filter: {
                    cwd: STATIC_PATH + 'src/templates/'
                }
            }
        }
    };

    // jshint
    configObj.jshint = {
        tests: {
            options: grunt.file.readJSON(__dirname + '/grunt/config/jshintrc_tests.js'),
            src: ['tests/*.js']
        },
        grunt: {
            options: grunt.file.readJSON(__dirname + '/grunt/config/jshintrc_tests.js'),
            src: ['grunt/config/*.js']
        }
    };

    // watch
    configObj.watch = {
        options: {
            interrupte: true,
            livereload: true,
            livereloadOnError: false
        },
        scripts: {
            files: [STATIC_PATH + 'src/js/*.js', STATIC_PATH + 'src/js/doggy/*.js'],
            tasks: ['jsmerge', 'static-version']
        },
        sass: {
            files: [STATIC_PATH + 'src/sass/*.scss', STATIC_PATH + 'src/sass/doggy/*.scss'],
            tasks: ['sass', 'static-version']
        },
        sprite: {
            files: [STATIC_PATH + 'src/sprite/*'],
            tasks: ['sprite', 'sass', 'imagemin']
        },
        html: {
            files: [STATIC_PATH + 'src/templates/*.html'],
            tasks: ['htmlhintplus', 'htmlmin']
        },
        karma: {
            files: [STATIC_PATH + 'src/js/doggy/*.js', 'tests/*.js'],
            tasks: ['jshint:tests', 'karma']
        },
        grunt: {
            files: ['grunt/config/*.js'],
            tasks: ['jshint:grunt']
        },
        image: {
            files: [STATIC_PATH + 'src/img/*'],
            tasks: ['imagemin']
        }
    };

    // sprite
    var fs = require('fs'), dirList, dir;
    configObj.sprite = {};
    dirList = fs.readdirSync(STATIC_PATH + 'src/sprite/');
    while (dir = dirList.pop()) {
        configObj.sprite[dir] = {
            src: STATIC_PATH + 'src/sprite/'+ dir + '/*.png',
            destImg: STATIC_PATH + 'src/img/' + dir + '.png',
            destCSS: STATIC_PATH + 'src/sass/sprite/_' + dir + '.scss',
            imgPath: '../img/' + dir + '.png',
            imgOpts: {
                format: 'png',
                quality: 100
            }
        }
    }

    // jsmerge
    configObj.jsmerge = {
        options: {
            jshintrc: 'grunt/config/jshintrc.js',
            uglifyopt: {
                sourceMap: true
            }
        },
        dist: {
            files: {
                src: STATIC_PATH + 'src/js/',
                dest: STATIC_PATH + 'js/'
            }
        }
    };

    // htmlhintplus
    configObj.htmlhintplus = {
        options: {
            htmlhintrc: 'grunt/config/htmlhintrc.js'
        },
        dist: {
            src: [STATIC_PATH + 'src/templates/']
        }
    };

    // karma
    configObj.karma = {
        unit: {
            configFile: 'grunt/config/karma.conf.js'
        }
    };

    // static-version
    configObj['static-version'] = {
        dist: {
            files: {
                src: 'templates/*.html',
                baseDir: 'templates'
            }
        }
    };

    grunt.config.init(configObj);

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-htmlmin');
    grunt.loadNpmTasks('grunt-jsmerge');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-static-version');
    grunt.loadNpmTasks('grunt-htmlhint-plus');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['sprite', 'sass', 'imagemin', 'jsmerge', 'jshint:tests', 'karma', 'htmlhintplus', 'htmlmin', 'static-version']);
};
