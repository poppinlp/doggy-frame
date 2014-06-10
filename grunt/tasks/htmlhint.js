var hint = require('../lib/htmlhint.js').HTMLHint;

module.exports = exports = function(grunt) {
    grunt.registerTask('htmlhint', 'HTMLHint rules by http://htmlhint.com/', function () {
        grunt.file.recurse('src/templates/', function (path, root, sub, file) {
            if (file[0] === '.') return;
            validation(path);
        });

        function validation (file) {
            var html, errLen, msg, i = 0;

            grunt.log.writeln();
            grunt.log.ok('Validation started for ' + file + '...');
            html = grunt.file.read(file, { encoding: 'utf8' });
            err = hint.verify(html);

            errLen = err.length;
            if (errLen) {
                for (msg = err[i]; i < errLen; i++) {
                    grunt.log.error('Line:' + msg.line + ' => ' + msg.message);
                }
                grunt.log.error('Validation fail: ' + errLen + ' errors.');
                grunt.fail.fatal(errLen + ' errors.');
                grunt.log.writeln();
            } else {
                grunt.log.ok('Validation successful!');
            }
        }
    });
}
