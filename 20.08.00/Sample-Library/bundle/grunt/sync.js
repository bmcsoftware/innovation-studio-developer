module.exports = {
    resources: {
        expand: true,
        flatten: false,
        cwd: '<%= bundle.src %>',
        src: [
            ['resources/**', 'lib/**']
        ],
        dest: '<%= bundle.target %>'
    }
};