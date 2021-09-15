module.exports = function (grunt, config) {
    return {
        options: {
            sourceMap: !!grunt.option('generate-sourcemap'),
            sourceMapIncludeSources: true
        },
        app: {
            src: '<%= bundle.target %>/scripts/<%= bundle.id %>.js',
            dest: '<%= bundle.target %>/scripts/<%= bundle.id %>.js'
        }
    };
};