module.exports = function (grunt, config) {
    return {
        app: {
            expand: true,
            flatten: false,
            cwd: '<%= bundle.src %>',
            src: [
                'index.html',
                'error.html',
                'unexpected-error.html',
                'bootstrap.js',
                'view-loader.js'
            ],
            dest: '<%= bundle.target %>',
            options: {
                process: function fileProcess(content, srcpath) {
                    return grunt.template.process(content);
                }
            }
        }
    };
};
