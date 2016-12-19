module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        meta: {
            dist: 'dist',
            appInfo: grunt.file.readJSON('bower.json'),
            config: grunt.file.readJSON('config.json')
        },
        clean: {
            beforebuild: ['<%= meta.dist %>/<%= meta.appInfo.name%>','<%= meta.dist %>/<%= meta.appInfo.name%>.tgz']
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
            options: grunt.file.readJSON('.hooks/js/config.json'),
            toConsole: {
                src: [
                    'gemini/gemini.test.js',
                    'test/unit-test.html',
                    'performance-test/performance-test.html',
                    '<?= elementName ?>.html'
                ]
            }
        },
        jscs: {
            src: [
                'gemini/gemini.test.js',
                'test',
                'performance-test'
            ],
            options: {
                config: '.hooks/js/.jscsrc',
                extract: [
                    'test/unit-test.html',
                    'performance-test/performance-test.html',
                    '<?= elementName ?>.html'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-clean');
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
        var bowerConfig = grunt.file.readJSON('.bowerrc');
        var YAML = require('yamljs');
        var geminiConfig = YAML.load('.gemini.yml');
        var geminiBrowserstackConfig = geminiConfig.system.plugins.browserstack;
        var yamlString, performanceTestJSON, bowerrcJSON;

        geminiBrowserstackConfig.username = config.browserstackUserName;
        geminiBrowserstackConfig.accessKey = config.browserstackAPIKey;

        perfomanceTestConfig.username = config.browserstackUserName;
        perfomanceTestConfig.key = config.browserstackAPIKey;

        bowerConfig.registry = config.jFrogURL;

        yamlString = YAML.stringify(geminiConfig, 4);
        performanceTestJSON = JSON.stringify(perfomanceTestConfig, null, '\t');
        bowerrcJSON = JSON.stringify(bowerConfig, null, '\t');

        grunt.file.write('.gemini.yml', yamlString);
        grunt.file.write('browserstack.json', performanceTestJSON);
        grunt.file.write('browserstack.json', bowerrcJSON);
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

    grunt.registerTask('private-deploy', [
        'clean:beforebuild',
        'compress',
        'artdeploy'
    ]);

    grunt.registerTask('lint', [
        'jshint'
    ]);

    grunt.registerTask('jscs-check', [
        'jscs'
    ]);
};
