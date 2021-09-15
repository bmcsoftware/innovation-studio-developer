module.exports = function (grunt, config) {
    var path = require('path');

    function process(src, filepath) {
        src = grunt.template.process(src);

        // Get urls with quotes
        src = src.replace(/url\s*\(([^\)]+)/g, function (match, url) {
            // Trim quotes and spaces
            url = url.replace(/^[\s'"]*/, '').replace(/[\s'"]*$/, '');

            // Filter data urls
            var result;

            if (!/^data/.test(url)) {
                url = path.join(config.bundle.id, path.relative(config.bundle.src, path.resolve(path.dirname(filepath), url)));
                result = 'url(\'/' + url.split(path.sep).join('/') + '\'';
            } else {
                result = match;
            }

            return result;
        });

        return src;
    }

    function getPaths(filesList, extension) {
        return filesList.map(function (filePath) {
            return '<%= bundle.src %>/' + filePath + extension;
        });
    }

    return {
        app: {
            options: {
                sourceMap: false
            },
            files: [
                {
                    src: getPaths(config.bundle.packages.app.scripts, '.js').concat([
                        '<%= bundle.target %>/scripts/<%= bundle.id %>-templates.min.js'
                    ]),
                    dest: '<%= bundle.target %>/scripts/<%= bundle.id %>.js'
                },
                {
                    src: getPaths(config.bundle.packages.ext.scripts, '.js').concat([
                        '<%= bundle.target %>/scripts/<%= bundle.id %>-templates-ext.min.js'
                    ]),
                    dest: '<%= bundle.target %>/scripts/<%= bundle.id %>-ext.js'
                }
            ]
        },
        libCss: {
            options: {
                process: process
            },
            files: [
                {
                    src: getPaths(config.bundle.packages.lib.styles, '.min.css'),
                    dest: '<%= bundle.target %>/resources/css/<%= bundle.id %>-deps.min.css'
                }
            ]
        },
        libJs: {
            files: [
                {
                    src: getPaths(config.bundle.packages.lib.scripts, '.min.js'),
                    dest: '<%= bundle.target %>/scripts/<%= bundle.id %>-deps.min.js'
                }
            ]
        }
    };
};