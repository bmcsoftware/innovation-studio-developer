module.exports = function (grunt, config) {
    var combine = require('istanbul-combine'),
        minimatch = require('minimatch'),
        path = require('path'),
        _ = require(path.join(process.cwd(), 'node_modules/lodash'));

    try {
        var coverageConfig = require(path.join(process.cwd(), './coverage.conf'))();
    } catch (e) {
        if (e instanceof Error && e.code === 'MODULE_NOT_FOUND') {
            grunt.log.writeln('INFO: coverage.conf.js file could not be found. Full HTML coverage report will be created.');
        } else {
            throw e;
        }
    }

    if (config.bundle.options['ignore-coverage-report-errors']) {
        grunt.log.warn('Ignoring coverage report errors'.toUpperCase());
    }

    if (!config.bundle.coverage) {
        config.bundle.coverage = './target/coverage';

        grunt.log.writeln('INFO: Coverage report path is not defined in bundle.conf.js. Default path will be used: ' + config.bundle.coverage);
    }

    function generateHtmlCoverageReport(coverageGroupName) {
        combine.sync({
            dir: config.bundle.coverage + '/' + coverageGroupName,
            pattern: config.bundle.coverage + '/' + coverageGroupName + '/' + coverageGroupName + '.json',
            print: 'none',
            reporters: {
                html: {}
            }
        });
    }

    function generateHtmlCoverageReports(coverageGroupNames) {
        var htmlReportNames = ['full'].concat(coverageGroupNames);

        if (grunt.file.exists(config.bundle.coverage + '/unknown/unknown.json')) {
            htmlReportNames.push('unknown');
        }

        htmlReportNames.forEach(generateHtmlCoverageReport);
    }

    function parseJsonCoverageReports(coverageGroupNames) {
        var hasErrors = false,
            usedFileMasks = {},
            fullCoverageReport = grunt.file.readJSON(config.bundle.coverage + '/full/full.json');

        function reportError(message) {
            grunt.log.error('ERROR: ' + message);
            hasErrors = true;
        }

        var coverageReportsByGroupName = _.reduce(
            fullCoverageReport,

            function (result, coverage, path) {
                var matches = {};

                _.forEach(coverageGroupNames, function (coverageGroupName) {
                    matches[coverageGroupName] = _.filter(coverageConfig.groups[coverageGroupName], function (fileMask) {
                        var matched = minimatch(path, fileMask);

                        if (matched) {
                            if (usedFileMasks[fileMask]) {
                                usedFileMasks[fileMask]++;
                            } else {
                                usedFileMasks[fileMask] = 1;
                            }
                        }

                        return matched;
                    });

                    if (matches[coverageGroupName].length) {
                        result[coverageGroupName][path] = coverage;
                    }
                });

                var matchCount = _(matches)
                    .values()
                    .reduce(function (result, item) {
                        return result.concat(item);
                    }, [])
                    .length;

                if (!matchCount) {
                    result.unknown[path] = coverage;
                } else if (matchCount > 1) {
                    var message = 'File ' + path + ' is included in more than one coverage group.';

                    _.forEach(matches, function (group, groupName) {
                        if (group.length) {
                            message += '\n  ' + groupName + ':';

                            _.forEach(group, function (mask) {
                                message += '\n    ' + mask;
                            });
                        }
                    });

                    reportError(message);
                }

                return result;
            },

            _.zipObject(coverageGroupNames.concat('unknown'), _.times(coverageGroupNames.length + 1, _.create))
        );

        _.forEach(coverageGroupNames, function (coverageGroupName) {
            grunt.file.write(config.bundle.coverage + '/' + coverageGroupName + '/' + coverageGroupName + '.json', JSON.stringify(coverageReportsByGroupName[coverageGroupName]));
        });

        if (_.size(coverageReportsByGroupName.unknown)) {
            reportError(_.size(coverageReportsByGroupName.unknown) + ' file(s) are not included in any coverage group as defined in coverage.conf.js file. ' +
                'Check coverage report in the ' + config.bundle.coverage + '/unknown directory to see which files have to be assigned to defined coverage groups.');

            grunt.file.write(config.bundle.coverage + '/unknown/unknown.json', JSON.stringify(coverageReportsByGroupName.unknown));
        }

        // Verify that all masks have been used.
        var notUsedMasks = _.difference(
            _(coverageConfig.groups).reduce(function (result, item) {
                return result.concat(item);
            }, []),
            _.keys(usedFileMasks)
        );

        if (notUsedMasks.length) {
            var message = 'INFO: ' + notUsedMasks.length + ' file mask(s) in coverage.conf.js have not been used. Please check if they can be removed.';

            notUsedMasks.forEach(function (mask) {
                message += '\n  ' + mask;
            });

            grunt.log.writeln(message);
        }

        return config.bundle.options['ignore-coverage-report-errors'] || !hasErrors;
    }

    grunt.registerTask('rxCoverage', function () {
        var success = true;

        if (coverageConfig) {
            var coverageGroupNames = _.keys(coverageConfig.groups);

            success = parseJsonCoverageReports(coverageGroupNames);

            generateHtmlCoverageReports(coverageGroupNames);
        } else {
            generateHtmlCoverageReport('full');
        }

        return success;
    });

    return {};
};