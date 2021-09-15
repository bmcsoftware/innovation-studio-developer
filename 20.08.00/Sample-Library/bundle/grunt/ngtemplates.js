module.exports = function (grunt, config) {
    return {
        app: {
            options: {
                htmlmin: {
                    collapseWhitespace: true
                },
                module: 'com.bmc.arsys.rx.standardlib.utils'
            },
            files: [
                {
                    cwd: '<%= bundle.src %>',
                    src: config.bundle.packages.app.templates,
                    dest: '<%= bundle.target %>/scripts/<%= bundle.id %>-templates.min.js'
                },
                {
                    cwd: '<%= bundle.src %>',
                    src: config.bundle.packages.ext.templates,
                    dest: '<%= bundle.target %>/scripts/<%= bundle.id %>-templates-ext.min.js'
                }
            ]
        }
    };
};