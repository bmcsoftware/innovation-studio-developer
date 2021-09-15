module.exports = {
    options: {
        globals: {},
        esprimaOptions: {},
        verbose: false
    },
    targetName: {
        files: {
            src: ['<%= bundle.src %>/scripts/**/*.js']
        }
    }
};