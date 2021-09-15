module.exports = function (karmaConfig) {
    var path = require('path'),
        bundleConfPath = './bundle.conf.json',
        packagePath = './package.json',
        rxEnvironment = require('./grunt/rxEnvironment.js'),
        _ = require(path.join(process.cwd(), 'node_modules/lodash')),
        grunt = require(path.join(process.cwd(), 'node_modules/grunt'));

    grunt.file.setBase(process.cwd());

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

    var proxyPath = pkg.config.standardlibTarget + '/',
        isStandardlib = pkg.config.bundle.id === 'standardlib';

    var allFiles = grunt.file.expand(grunt.config.process(_([])
        .concat(Array.prototype.concat.apply([], pkg.config.bundle.resources.map(function (resource) {
            return resource.bundle.packages.lib.scripts.map(function (file) {
                return path.join(resource.dir, resource.bundle.target, file) + '.js';
            });
        })))
        .concat([
            '<%= standardlibTarget %>/lib/angular/angular-mocks.js',
            '<%= standardlibTarget %>/lib/jquery-simulate/jquery.simulate.js',
            '<%= standardlibTarget %>/lib/jasmine-jquery/jasmine-jquery.js',
            '<%= standardlibTarget %>/bootstrap.js',
            '<%= standardlibTarget %>/resources/css/standardlib-deps.min.css',
            '<%= standardlibTarget %>/resources/css/standardlib.css',
            '<%= standardlibTarget %>/resources/css/theme/*.css',
            isStandardlib && !grunt.option('skip-coverage') ? '' : '<%= standardlibTarget %>/scripts/standardlib.js',
            isStandardlib ? '<%= standardlibTarget %>/view-loader.js' : '',
            isStandardlib ? '' : '<%= bundle.target %>/resources/css/<%= bundle.id %>.css'
        ])
        .concat(isStandardlib && grunt.option('skip-coverage') ? [] : pkg.config.bundle.packages.app.scripts.map(function (file) {
            var prefix = '<%= bundle.src %>/';

            if (file[0] == '!') {
                file = file.replace('!', '');
                prefix = '!' + prefix;
            }

            return prefix + file + '.js';
        }))
        .concat([
            '<%= bundle.target %>/scripts/**/<%= bundle.id %>-templates.min.js',
            '<%= bundle.src %>/scripts/**/*.html',
            '<%= bundle.src %>/**/jasmine-helpers.js',
            isStandardlib ? '<%= bundle.src %>/view-loader.test.js' : '',
            '<%= bundle.src %>/scripts/**/*.test.js'
        ])
        .compact()
        .value()
    )).map(function (filepath) {
        var extname = path.extname(filepath);

        if ([
            '.js',
            '.html',
            '.css'
        ].indexOf(extname) > -1) {
            return filepath;
        } else {
            return {
                included: false,
                served: true,
                pattern: filepath
            };
        }
    });

    karmaConfig.set(grunt.config.process({
        files: allFiles,

        preprocessors: _.mapKeys({
            '<%= bundle.src %>/scripts/**/!(*.test).js': ['coverage'],
            '<%= bundle.src %>/scripts/**/*.html': ['ng-html2js']
        }, function (value, key) {
            return grunt.config.process(key);
        }),

        proxies: _.mapKeys({
            // Proxies /standardlib and /innovation-studio to fix unit test warnings due to invalid paths to static resources
            '/standardlib/resources/': proxyPath + 'resources/',
            '/standardlib/lib/': proxyPath + 'lib/',
            '/api/rx/application/': 'api/rx/application/',
            '/default-image.png': 'default-image.png'
        }, function (value, key) {
            return grunt.config.process(key);
        }),

        ngHtml2JsPreprocessor: {
            stripPrefix: pkg.config.bundle.src.replace(/^\.\//, '') + '/',
            moduleName: 'templates'
        },

        frameworks: [
            'jasmine',
            'jasmine-matchers'
        ],

        client: {
            jasmine: {
                random: false
            }
        },

        plugins: [
            'karma-jasmine',
            'karma-jasmine-matchers',
            'karma-chrome-launcher',
            'karma-coverage',
            'karma-ng-html2js-preprocessor'
        ],

        logLevel: 'WARN',

        reporters: [
            'dots',
            'coverage'
        ],

        coverageReporter: {
            dir: path.join(process.cwd(), 'target/coverage/'),
            file: 'full.json',
            subdir: 'full',
            type: 'json'
        },

        port: 9090,
        urlRoot: '/',
        autoWatch: false,
        browsers: ['ChromeHeadless'],
        customLaunchers: {
            ChromeHeadless: {
                base: 'Chrome',
                flags: [
                    '--headless',
                    '--disable-gpu',
                    // Without a remote debugging port, Google Chrome exits immediately.
                    '--remote-debugging-port=9222'
                ]
            }
        },

        captureTimeout: 90000,
        browserDisconnectTimeout: 10000,
        browserDisconnectTolerance: 3,
        browserNoActivityTimeout: 120000,

        singleRun: true,
        background: false,
        reportSlowerThan: 0
    }));
};
