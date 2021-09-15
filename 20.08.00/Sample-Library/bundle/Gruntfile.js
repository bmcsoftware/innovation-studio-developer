module.exports = function (grunt) {
    'use strict';

    var path = require('path'),
        bundleConfPath = './bundle.conf.json',
        packagePath = './package.json',
        rxEnvironment = require('./grunt/rxEnvironment.js'),
        _ = require(path.join(process.cwd(), 'node_modules/lodash'));

    var pkg = grunt.file.readJSON(packagePath);

    _.merge(pkg.config, grunt.file.readJSON(bundleConfPath));

    pkg.config.bundle.resources = pkg.config.bundle.resources.map(function (resource) {
        var expandedResource = rxEnvironment.processConfigValue(resource, process.env);

        return _.merge(grunt.file.readJSON(path.join(expandedResource, bundleConfPath)), {dir: expandedResource});
    });

    _.forEach(pkg.config, function (value, key) {
        var expandedValue = pkg.config[key] = rxEnvironment.processConfigValue(value, process.env);

        grunt.config(key, expandedValue);
    });

    // Set configuration
    (function (grunt) {
        var options = pkg.config.bundle.options;

        for (var option in options) {
            var value = options[option];

            if (option === 'skip-tests') {
                if (grunt.option(option) !== true) {
                    grunt.option(option, value);
                }
                continue;
            } else if (grunt.option(option) === undefined) {
                grunt.option(option, value);
            }
        }
    })(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require(path.join(process.cwd(), 'node_modules/time-grunt'))(grunt);

    grunt.registerTask('validation-wrapper', function () {
        if (!grunt.option('skip-validation')) {
            grunt.task.run(['jshint', 'jsvalidate']);
        } else {
            grunt.log.warn('Skipping validation'.toUpperCase());
        }
    });

    grunt.registerTask('rxLicenseProcess-wrapper', function () {
        if (grunt.option('generate-license')) {
            grunt.task.run('rxLicenseProcess');
        }
    });

    grunt.registerTask('tests-wrapper', function () {
        if (!grunt.option('skip-tests')) {
            var tasks = ['karma'];

            if (!grunt.option('skip-coverage')) {
                tasks.push('clean:coverage', 'rxCoverage');
            } else {
                grunt.log.warn('Skipping coverage'.toUpperCase());
            }

            grunt.task.run(tasks);
        } else {
            grunt.log.warn('Skipping tests'.toUpperCase());
        }
    });

    grunt.registerTask('docs-wrapper', function () {
        if (grunt.option('generate-docs')) {
            grunt.task.run('ngdocs');
        } else {
            grunt.log.warn('Skipping docs generation'.toUpperCase());
        }
    });

    // Register all the tasks that can be executed on the command line
    grunt.registerTask('server-debug', function () {
        if (grunt.file.exists(path.join(process.cwd(), pkg.config.bundle.target, 'index.html'))) {
            var launchServerDebug = pkg.config.bundle.id === 'standardlib' ? Boolean(grunt.option('application-id')) : true;

            if (launchServerDebug) {
                grunt.task.run([
                    'configureProxies:app',
                    'connect:app',
                    'open'
                ]);
            }
        } else {
            // LMA:: We are in a bundle.
            grunt.task.run([
                'configureProxies:app',
                'connect:app',
                'open'
            ]);
        }
    });

    grunt.registerTask('blocker', function () {
        this.async();
    });

    grunt.registerTask('server-release', [
        'configureProxies:app',
        'connect:app',
        'open',
        'blocker'
    ]);

    grunt.registerTask('debug', 'Main task for development', [
        'validation-wrapper',

        'clean',
        'sync',

        'sass:debug',
        'concat:libCss',

        'generateDepsLoader:lib',

        'ngtemplates:app',
        'concat:app',

        'copy',

        'tests-wrapper',

        'server-debug',
        'chokidar'
    ]);

    grunt.registerTask('dev', 'Fastest development task skips tests, jshint and js validation', function () {
        grunt.option('skip-tests', true);
        grunt.option('skip-validation', true);
        grunt.task.run('debug');
    });

    grunt.registerTask('default', ['dev']);

    grunt.registerTask('release', 'Main task for production, to create minified app', function () {
        grunt.config('release', true);
        grunt.option('skip-coverage', true);

        grunt.task.run([
            'validation-wrapper',

            'clean',
            'rxLicenseProcess-wrapper',
            'sync',

            'sass:release',

            'ngtemplates:app',
            'concat:app',
            'ngAnnotate:app',
            'uglify:app',

            'concat:libCss',
            'generateDepsLoader:lib',

            'copy',

            'tests-wrapper',

            'docs-wrapper'
        ]);
    });

    // Load all tasks
    require(path.join(process.cwd(), 'node_modules/load-grunt-config'))(grunt, {
        configPath: [path.join(__dirname, 'grunt')],
        mergeFunction: require(path.join(process.cwd(), 'node_modules/recursive-merge')),
        data: pkg.config,
        loadGruntTasks: {
            pattern: ['grunt-*'],
            config: require(path.join(process.cwd(), packagePath)),
            scope: 'devDependencies'
        }
    });
};