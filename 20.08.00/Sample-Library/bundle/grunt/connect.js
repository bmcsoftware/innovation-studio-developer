module.exports = function (grunt, config) {
    var path = require('path'),
        serveStatic = require(path.join(process.cwd(), 'node_modules/serve-static'));

    return {
        app: {
            proxies: [
                {
                    context: ['/', '/api', '!/standardlib', '!/innovationsuite', '!/' + config.bundle.id],
                    host: grunt.option('api-host'),
                    port: grunt.option('api-port'),
                    https: grunt.option('api-https'),
                    // LMA:: Adding this new parameter after new SSL Certificate
                    secure: grunt.option('api-https') ? false : true
                }, {
                    context: '/innovationsuite',
                    host: grunt.option('host'),
                    port: grunt.option('port'),
                    rewrite: {
                        '^/innovationsuite': '/standardlib'
                    }
                }
            ],
            options: {
                hostname: grunt.option('host'),
                port: grunt.option('port'),
                // LMA:: Adding protocol to debug on Aws instances.
                protocol: grunt.option('api-https') ? 'https' : 'http',
                middleware: function (connect, options, middlewares) {
                    return grunt.config.process([
                        // Path concated with process working directory as workaround to grunt-connect-proxy bug
                        require(path.join(process.cwd(), 'node_modules/grunt-connect-proxy2/lib/utils')).proxyRequest,
                        require('connect-livereload')({port: parseInt(grunt.option('livereload-port'))})
                    ])
                        .concat(config.bundle.resources.map(function (dep) {
                            return ['/' + dep.bundle.id, serveStatic(path.join(dep.dir, dep.bundle.target))];
                        }))
                        .concat(config.bundle.resources.map(function (dep) {
                            return ['/' + dep.bundle.id, serveStatic(path.join(dep.dir, dep.bundle.src))];
                        }))
                        .concat(middlewares);
                }
            }
        }
    };
};