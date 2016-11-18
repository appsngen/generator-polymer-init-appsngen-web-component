module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        meta: {
            dist: 'dist',
            appName: grunt.file.readJSON('package.json').name,
            config: grunt.file.readJSON('config.json')
        },
        clean: {
            beforebuild: ['<%= meta.dist %>/<%= meta.appName%>','<%= meta.dist %>/<%= meta.appName%>.tgz']
        },
        compress: {
            main: {
                options: {
                    archive: '<%= meta.dist %>/<%= meta.appName%>.tgz'
                },
                files: [
                    {
                        src: ['*', 'gemini/*', 'perfomance-test/*', 'src/*', 'test/*'],
                        dest: '/',
                        filter: 'isFile'
                    }
                ]
            }
        },
        artdeploy: {
            options: {
                apiKey: '<%= meta.config.jFrogAPIKey %>',
                repositoryPath: 'https://appsngen.jfrog.io/appsngen/bower-local',
                targetPath: '<%= meta.appName %>.tgz',
                packagePath: '<%= meta.dist %>/<%= meta.appName%>.tgz'
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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-artifactory-deploy');
    grunt.loadNpmTasks('grunt-browserstacktunnel-wrapper');
    grunt.loadNpmTasks('web-component-tester');
    grunt.loadNpmTasks('grunt-gemini-runner');
    grunt.loadNpmTasks('grunt-browserstack-performance-test');

    grunt.registerTask('update-keys', function(){
        var config = grunt.file.readJSON('config.json');
        var perfomanceTestConfig = grunt.file.readJSON('browserstack.json');
        var YAML = require('yamljs');
        var geminiConfig = YAML.load('.gemini.yml');
        var geminiBrowserstackConfig = geminiConfig.system.plugins.browserstack;
        var yamlString, jsonString;

        geminiBrowserstackConfig.username = config.browserstackUserName;
        geminiBrowserstackConfig.accessKey = config.browserstackAPIKey;

        perfomanceTestConfig.username = config.browserstackUserName;
        perfomanceTestConfig.key = config.browserstackAPIKey;

        yamlString = YAML.stringify(geminiConfig, 4);
        jsonString = JSON.stringify(perfomanceTestConfig, null, '\t');

        grunt.file.write('.gemini.yml', yamlString);
        grunt.file.write('browserstack.json', jsonString);
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
};
