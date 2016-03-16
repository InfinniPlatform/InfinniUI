﻿module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    var appFiles = [
            'js/**/*.js'
        ],
        templateFiles = ["js/**/*.tpl.html"];

    var infinniUIpath = '..';
    var fromInfinniToConfigPath = 'example/styles';
    var platformBuildArgs = JSON.stringify({
        "override": {
            "less": {
                "pl-override-platform-variables-path": '\"../../<%configPath%>/platform-variables.less\"',
                "pl-override-bootstrap-variables-path": '\"../../<%configPath%>/bootstrap-variables.less\"',
                "pl-bootstrap-theme-path": '\"../../<%configPath%>/bootstrap-theme.less\"',
                "pl-extension-path": '\"../../<%configPath%>/extensions.less\"'
            }
        }
    })
    .replace(/<%configPath%>/g, fromInfinniToConfigPath);

    platformBuildArgs = platformBuildArgs.replace(/:/g, '=');

    grunt.initConfig({
        concat: {
            app: {
                options: {
                    sourceMap: false,
                    process: function(src, filepath) {
                        return '//####' + filepath + '\n' + src;
                    }
                },
                src: appFiles,
                dest: 'www/compiled/js/app.js'
            }
        },

        copy: {
            infinniUI: {
                expand: true,
                cwd: infinniUIpath + '/out/',
                src: '**/*',
                dest: 'www/compiled/platform/'
            }
        },

        jst : {
            templates : {
                options : {
                    namespace : 'InfinniUI.Template',
                    prettify : true,
                    processName : function (filename) {
                        return filename.replace(/.*elements\//, '');
                    }
                },
                files : {
                    "www/compiled/js/templates.js" : templateFiles
                }
            }
        },

        connect: {
            http: {
                options: {
                    base: 'www',
                    hostname : '*',
                    port: 8181,
                    open:'http:/localhost:8181',
                    keepalive: true
                }
            }
        },

        clean: ["www/compiled/"]
    });

    grunt.registerTask('buildPlatform', function () {
        var done = this.async();

        grunt.util.spawn({
                grunt: true,
                args: ['build:' + platformBuildArgs],
                opts: {
                    cwd: infinniUIpath
                }
            }, function(error, result, code){
                console.log(result.stdout);
                console.log(error);
                done();
            }

        );
    });

    grunt.task.registerTask('build',
        function () {
            var tasks = [
                'buildPlatform',
                'clean',
                'copy',
                'concat',
                'jst'
            ];

            grunt.task.run(tasks);
        }
    );

    grunt.task.registerTask('default', function (protocol) {
            var protocols = ['http', 'https'];
            if (protocols.indexOf(protocol) === -1) {
                protocol = protocols[0];
            }
            var tasks = ['build', 'connect:' + protocol];

            grunt.task.run(tasks);
        }
    );

};