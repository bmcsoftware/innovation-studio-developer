module.exports = function (grunt) {
    return {
        options: {
            newcap: false,
            reporter: 'jslint',
            reporterOutput: ''
        },
        all: ['<%= bundle.src %>/scripts/**/*.js']
    };
};