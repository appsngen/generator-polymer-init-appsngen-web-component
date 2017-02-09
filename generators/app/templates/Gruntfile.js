module.exports = function (grunt) {
    'use strict';

    var jsHintDefaultConfig = grunt.file.readJSON('.hooks/js/config.json');
    var jsHintReportConfig = grunt.file.readJSON('.hooks/js/config.json');

    jsHintReportConfig.reporter = require('jshint-html-reporter');
    jsHintReportConfig.reporterOutput = 'jshint-report/jshint-report.html';

    // Project configuration.
    grunt.initConfig({
        meta: {
            dist: 'dist',
            tmp: '.tmp',
            appInfo: grunt.file.readJSON('bower.json'),
            config: grunt.file.readJSON('config.json')
        },
        clean: {
            beforejscs: ['<%= meta.tmp %>'],
            afterjscs: ['<%= meta.tmp %>'],
            beforebuild: ['<%= meta.dist %>/<%= meta.appInfo.name%>', '<%= meta.dist %>/<%= meta.appInfo.name%>.tgz']
        },
        copy: {
            jscscheck: {
                expand: true,
                src: [
                    '<?= elementName ?>.html'
                ],
                dest: '<%= meta.tmp %>'
            }
        },
        compress: {
            main: {
                options: {
                    archive: '<%= meta.dist %>/<%= meta.appInfo.name%>.tgz'
                },
                files: [
                    {
                        src: ['*', 'gemini/*', 'performance-test/*', 'test/*', 'demo/*'],
                        dest: '/',
                        filter: 'isFile'
                    }
                ]
            }
        },
        artdeploy: {
            options: {
                apiKey: '<%= meta.config.jFrogAPIKey %>',
                repositoryPath: '<%= meta.config.jFrogRepositoryPath %>',
                targetPath: '<%= meta.appInfo.name %>',
                version: '<%= meta.appInfo.version %>',
                packagePath: '<%= meta.dist %>/<%= meta.appInfo.name %>.tgz'
            }
        },
        'browserstacktunnel-wrapper': {
            options: {
                key: '<%= meta.config.browserstackAPIKey %>'
            }
        },
        'wct-test': {
            local: {
                options: {
                    browsers: ['chrome'],
                    enforceJsonConf: true
                }
            },
            remote: {
                options: {
                    plugins: {
                        local: false,
                        sauce: {}
                    }
                }
            }
        },
        'gemini-runner': {
            'local-update': {
                options: {
                    task: 'update',
                    config: '.gemini-local.yml',
                    local: true
                }
            },
            'local-test': {
                options: {
                    task: 'test',
                    config: '.gemini-local.yml',
                    local: true
                }
            },
            'remote-update': {
                options: {
                    task: 'update'
                }
            },
            'remote-test': {
                options: {
                    task: 'test',
                    reporter: 'html'
                }
            }
        },
        'browserstack-performance-test': {
            'test': {
                options: {
                    filePath: 'performance-test/result.xml',
                    toConsole: true,
                    toFile: true,
                    numberOfRuns: 3
                }
            }
        },
        jshint: {
            options: jsHintDefaultConfig,
            toConsole: {
                src: [
                    'gemini/gemini.test.js',
                    'Gruntfile.js',
                    'test/unit-test.html',
                    'performance-test/performance-test.html',
                    '<?= elementName ?>.html'
                ]
            },
            report: {
                options: jsHintReportConfig,
                src: [
                    'gemini/gemini.test.js',
                    'Gruntfile.js',
                    'test/unit-test.html',
                    'performance-test/performance-test.html',
                    '<?= elementName ?>.html'
                ]
            }
        },
        // .tmp folder is used to test the JS code into the HTML-file which lie in the root folder,
        // because extract files should match path from src
        jscs: {
            src: [
                'gemini/gemini.test.js',
                'Gruntfile.js',
                'test',
                'performance-test',
                '.tmp'
            ],
            options: {
                config: '.hooks/js/.jscsrc',
                extract: [
                    'test/unit-test.html',
                    'performance-test/performance-test.html',
                    '.tmp/<?= elementName ?>.html'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-artifactory-deploy');
    grunt.loadNpmTasks('grunt-browserstacktunnel-wrapper');
    grunt.loadNpmTasks('web-component-tester');
    grunt.loadNpmTasks('grunt-gemini-runner');
    grunt.loadNpmTasks('grunt-browserstack-performance-test');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');

    grunt.registerTask('update-keys', function(){
        var config = grunt.file.readJSON('config.json');
        var perfomanceTestConfig = grunt.file.readJSON('browserstack.json');
        var YAML = require('yamljs');
        var geminiConfig = YAML.load('.gemini.yml');
        var geminiBrowserstackConfig = geminiConfig.system.plugins.browserstack;
        var bowerConfig;
        var yamlString, performanceTestJSON, bowerrcJSON;

        geminiBrowserstackConfig.username = config.browserstackUserName;
        geminiBrowserstackConfig.accessKey = config.browserstackAPIKey;

        perfomanceTestConfig.username = config.browserstackUserName;
        perfomanceTestConfig.key = config.browserstackAPIKey;

        try {
            bowerConfig = grunt.file.readJSON('.bowerrc');
        } finally {
            if (bowerConfig) {
                bowerConfig.registry = config.jFrogURL;
                bowerrcJSON = JSON.stringify(bowerConfig, null, 4);
                grunt.file.write('.bowerrc', bowerrcJSON);
            }
        }

        yamlString = YAML.stringify(geminiConfig, 4);
        performanceTestJSON = JSON.stringify(perfomanceTestConfig, null, 4);

        grunt.file.write('.gemini.yml', yamlString);
        grunt.file.write('browserstack.json', performanceTestJSON);
    });

    grunt.registerTask('wct-test-local', [
        'wct-test:local'
    ]);

    grunt.registerTask('wct-test-remote', [
        'browserstacktunnel-wrapper:start',
        'wct-test:remote',
        'browserstacktunnel-wrapper:stop'
    ]);

    grunt.registerTask('gemini-remote-update', [
        'gemini-runner:remote-update'
    ]);

    grunt.registerTask('gemini-remote-test', [
        'gemini-runner:remote-test'
    ]);

    grunt.registerTask('gemini-local-update', [
        'gemini-runner:local-update'
    ]);

    grunt.registerTask('gemini-local-test', [
        'gemini-runner:local-test'
    ]);

    grunt.registerTask('performance-test', [
        'browserstack-performance-test:test'
    ]);

    grunt.registerTask('deploy', [
        'clean:beforebuild',
        'compress',
        'artdeploy'
    ]);

    grunt.registerTask('lint', [
        'jshint:report'
    ]);

    grunt.registerTask('lint-console', [
        'jshint:toConsole'
    ]);

    grunt.registerTask('jscs-check', [
        'clean:beforejscs',
        'copy:jscscheck',
        'jscs',
        'clean:afterjscs'
    ]);
};
