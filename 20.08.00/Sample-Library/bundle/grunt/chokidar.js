module.exports = function (grunt, config) {
    var path = require('path');

    return {
        options: {
            livereload: parseInt(grunt.option('livereload-port')),
            spawn: false
        },
        sass: {
            options: {
                livereload: false,
                spawn: true
            },
            files: ['<%= bundle.src %>/resources/sass/**/*.scss'].concat(config.bundle.resources.map(function (resource) {
                return path.join(resource.dir, resource.bundle.src, 'resources/sass/**/*.scss');
            })),
            tasks: ['sass:debug']
        },
        css: {
            files: ['<%= bundle.target %>/resources/css/**/*.css'].concat(config.bundle.resources.map(function (resource) {
                return path.join(resource.dir, resource.bundle.target, 'resources/css/**/*.css');
            }))
        },
        scripts: {
            files: config.bundle.packages.app.scripts.concat(config.bundle.packages.ext.scripts).map(function (script) {
                return path.join(config.bundle.src, script) + '.js';
            }),
            tasks: ['validation-wrapper', 'concat:app', 'tests-wrapper']
        },
        templates: {
            files: config.bundle.packages.app.templates.concat(config.bundle.packages.ext.templates).map(function (script) {
                return path.join(config.bundle.src, script);
            }),
            tasks: ['ngtemplates:app', 'tests-wrapper', 'concat:app']
        },
        scriptsTarget: {
            files: ['<%= bundle.target %>/scripts/**.js'].concat(config.bundle.resources.map(function (resource) {
                return path.join(resource.dir, resource.bundle.target, 'scripts/**.js');
            }))
        },
        resources: {
            options: {
                livereload: false
            },
            files: ['<%= bundle.src %>/resources/**/*', '!<%= bundle.src %>/resources/sass/**/*'],
            tasks: ['sync', 'tests-wrapper']
        },
        index: {
            files: [
                '<%= bundle.src %>/index.html',
                '<%= bundle.src %>/bootstrap.js'
            ],
            tasks: ['copy']
        }
    };
};