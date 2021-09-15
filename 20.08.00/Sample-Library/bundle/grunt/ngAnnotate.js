module.exports = function (grunt, config) {
    return {
        options: {
            singleQuotes: true
        },
        app: {
            expand: true,
            src: '<%= bundle.target %>/scripts/<%= bundle.id %>.js'
        }
    };
};