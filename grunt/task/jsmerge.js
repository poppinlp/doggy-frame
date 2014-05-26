module.exports = exports = function(grunt) {
    grunt.registerTask('jsmerge', 'Merge js file', function () {
        grunt.file.recurse('templates/', function (path) {
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
