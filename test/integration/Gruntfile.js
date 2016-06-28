module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.initConfig({
        clean: {
            main: ['out']
        },
        concat: {
            features: {
                src: 'src/features/**/*.feature',
                dest: 'out/features/feature.feature'
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/support/',
                        src: '*.js',
                        dest: 'out/features/support'
                    },
                    {
                        expand: true,
                        cwd: 'src/step_definitions/',
                        src: '*.js',
                        dest: 'out/features/step_definitions'
                    }
                ]
            }
        }
    });

    grunt.registerTask('build', function (prop) {
        var tasks = [
            'clean',
            'concat',
            'copy'
        ];

        grunt.task.run(tasks);
    });
};