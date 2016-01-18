﻿module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-connect');

    var appFiles = [
            'js/**/*.js',

            '!js/app.js',
            '!js/launcherConfig.js'
        ],
        templateFiles = ["js/**/*.tpl.html"];

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
                dest: 'out/app.js'
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
                    "out/templates.js" : templateFiles
                }
            }
        },

        connect: {
            http: {
                options: {
                    open: 'http://localhost:8181/test/unit/',
                    hostname : '*',
                    port: '8181'
                }
            }
        }
    });

    grunt.task.registerTask('build',
        function () {
            var tasks = [
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