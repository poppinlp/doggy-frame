module.exports = function(grunt) {
    var configObj = {},
        STATIC_PATH = './';

    // uglify
    configObj.uglify = {
        dist: {
            files: [{
                expand: true,
                cwd: STATIC_PATH + '.js-cache/',
                src: '*.js',
                dest: STATIC_PATH + 'js'
            }]
        }
    };

    // sass
    configObj.sass = {
        dist: {
            options: {
                style: 'compressed',
                banner: '/* Please do not change this file. It is made by sass. */'
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
                src: ['*.{png,jpg}'],
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
                src: STATIC_PATH + 'src/templates/',
                dest: STATIC_PATH + 'templates/'
            }
        }
    };

    // jshint
    configObj.jshint = {
        options: grunt.file.readJSON(__dirname + '/grunt/config/jshintrc'),
        www: {
            src: [STATIC_PATH + '.js-cache/*.js']
        }
    };

    // watch
    configObj.watch = {
        scripts: {
            files: [STATIC_PATH + 'src/js/*.js'],
            tasks: ['jsmerge', 'jshint', 'uglify'],
            options: {
                interrupt: true
            }
        },
        sass: {
            files: [STATIC_PATH + 'src/sass/*.scss'],
            tasks: ['sass'],
            options: {
                interrupt: true
            }
        },
        sprite: {
            files: [STATIC_PATH + 'src/sprite/*'],
            tasks: ['sprite', 'imagemin'],
            options: {
                interrupt: true
            }
        },
        html: {
            files: [STATIC_PATH + 'src/templates/*'],
            tasks: ['htmlhint', 'htmlmin'],
            options: {
                interrupt: true
            }
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
        dist: {
            files: {
                src: STATIC_PATH + 'src/js/',
                dest: STATIC_PATH + '.js-cache/'
            }
        }
    };

    grunt.config.init(configObj);

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-htmlmin');
    grunt.loadNpmTasks('grunt-jsmerge');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadTasks('./grunt/tasks/');

    grunt.registerTask('default', ['jsmerge', 'jshint', 'uglify', 'sprite', 'sass', 'imagemin', 'htmlhint', 'htmlmin']);
};
