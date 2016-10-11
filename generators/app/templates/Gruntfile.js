module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        meta: {
            dist: 'dist',
            appName: grunt.file.readJSON('package.json').name
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
                apiKey: 'JFROG_API_KEY',
                repositoryPath: 'https://appsngen.jfrog.io/appsngen/bower-local',
                targetPath: '<%= meta.appName %>.tgz',
                packagePath: '<%= meta.dist %>/<%= meta.appName%>.tgz'
            }
        },
        'browserstacktunnel-wrapper': {
            options: {
                key: 'BROWSERSTACK_API_KEY'
            }
        },
        'wct-test': {
            local: {
                options: {browsers: ['chrome']}
            },
            remote: {
                options: {
                    plugins: {
                        local: false,
                        sauce: {}
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-artifactory-deploy');
    grunt.loadNpmTasks('grunt-browserstacktunnel-wrapper');
    grunt.loadNpmTasks('web-component-tester');

    grunt.registerTask('gemini', function(argv){
        var directory = '.';
        var cmd = 'gemini';
        var next = this.async();
        var gemini = grunt.util.spawn({
            cmd: cmd,
            args: argv?argv.split(','):['test'],
            opts: {
                cwd: directory
            }
        }, function (err, result, code) {
            if (err) {
                grunt.fail.fatal(err, code);
                next(code);
            } else {
                grunt.log.ok();
                next();
            }
        });

        if (typeof gemini === 'undefined') {
            grunt.fail.fatal(cmd + ' task failed.');
        }
        gemini.stdout.on('data', function (buf) {
            grunt.log.write(String(buf));
        });
        gemini.stderr.on('data', function (buf) {
            grunt.log.error(String(buf));
        });
    });

    grunt.registerTask('test-wct', [
        'browserstacktunnel-wrapper:start',
        'wct-test:remote',
        'browserstacktunnel-wrapper:stop'
    ]);

    grunt.registerTask('gemini-update', function () {
        grunt.task.run('gemini:update');
    });

    grunt.registerTask('gemini-test', function () {
        grunt.task.run('gemini:test');
    });

    grunt.registerTask('gemini-reporter', function () {
        grunt.task.run('gemini:test,--reporter,html');
    });

    grunt.registerTask('deploy', [
        'clean:beforebuild',
        'compress',
        'artdeploy'
    ]);
};
