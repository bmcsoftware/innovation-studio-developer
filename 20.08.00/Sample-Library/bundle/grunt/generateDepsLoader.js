module.exports = function (grunt, config) {
    var path = require('path'),
        fs = require('fs');

    grunt.registerMultiTask('generateDepsLoader', function () {
        var me = this;

        this.files.forEach(function (file) {
            grunt.file.write(file.dest, '');
        });

        this.files.forEach(function (file) {
            var filepaths = file.src.map(function (filepath) {
                return ['', me.data.prefix, filepath].join('/');
            });

            fs.appendFileSync(file.dest, 'rxLoadResources([' + filepaths.map(function (filepath) {
                    return '\'' + filepath + '\'';
                }) + '], ' + (me.data.immediateWrite || false).toString() + ');');

            grunt.log.writeln('File "' + file.dest + '" appended.');
        });
    });

    return {
        lib: {
            prefix: '<%= bundle.id %>',
            immediateWrite: true,
            files: [
                {
                    cwd: '<%= bundle.src %>',
                    src: [
                        config.bundle.packages.lib.scripts.map(function (file) {
                            return file + '.js';
                        }),
                        config.bundle.packages.lib.scripts.map(function (file) {
                            return file + '.min.js';
                        })
                    ],
                    dest: '<%= bundle.target %>/scripts/<%= bundle.id %>-deps.min.js',
                    filter: function (path) {
                        var isMinified = path.indexOf('min.js') !== -1;

                        if (grunt.config('release') === true) {
                            return isMinified;
                        } else {
                            return !isMinified;
                        }
                    }
                }
            ]
        },
        app: {
            prefix: '<%= bundle.id %>',
            immediateWrite: '<%= release %>',
            files: [
                {
                    cwd: '<%= bundle.src %>',
                    src: config.bundle.packages.app.scripts.map(function (file) {
                        return file + '.js';
                    }),
                    dest: '<%= bundle.target %>/scripts/<%= bundle.id %>.js'
                },
                {
                    cwd: '<%= bundle.src %>',
                    src: config.bundle.packages.ext.scripts.map(function (file) {
                        return file + '.js';
                    }),
                    dest: '<%= bundle.target %>/scripts/<%= bundle.id %>-ext.js'
                }
            ]
        }

    };
};