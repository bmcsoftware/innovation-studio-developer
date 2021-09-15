var sass = require('node-sass');

module.exports = function (grunt, config) {
    var path = require('path'),
        _ = require(path.join(process.cwd(), 'node_modules/lodash'));

    function resolvePath(url, prev, done) {
        // Search in both process and root file directories
        var cwd = [
                path.resolve(path.dirname(prev)),
                process.cwd()
            ],
            name = path.basename(url),
            filePattern = '+(_|)' + name + '+(.scss|.css)';

        url = grunt.template.process(url);

        var filename,
            joinPath,
            urlDirName = path.dirname(url);

        for (var i = 0, len = cwd.length; (i < len) && !filename; ++i) {
            if (path.isAbsolute(urlDirName)) {
                joinPath = path.join(urlDirName, filePattern);
            } else {
                joinPath = path.join(cwd[i], urlDirName, filePattern);
            }

            filename = _.first(grunt.file.expand(joinPath));
        }

        done({
            file: filename,
            contents: grunt.file.read(filename),
            map: ''
        });
    }

    return _.mapValues({
        options: {
            implementation: sass,
            sourceMap: true,
            sourceMapContents: true,
            importer: resolvePath
        },
        debug: {
            options: {
                implementation: sass,
                outputStyle: 'expanded'
            }
        },
        release: {
            options: {
                implementation: sass,
                outputStyle: 'compressed'
            }
        }
    }, function (value) {
        return _.merge({
            files: config.bundle.packages.app.styles
                .concat(config.bundle.packages.ext.styles)
                .map(function (style) {
                    // TODO unhardcode this
                    style += '.scss';

                    return {
                        src: '<%= bundle.src %>/' + style,
                        dest: '<%= bundle.target %>/' + style.replace(/s[ac]ss/g, 'css')
                    };
                })
        }, value);
    });
};
