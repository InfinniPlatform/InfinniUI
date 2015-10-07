module.exports = function (grunt) {
	grunt.initConfig({
        concat: {
            feature: {
                src: [],
                dest: 'out/feature.feature'
            },
			
			step_definitions: {
                src: ["features/support/*.js", "features/step_definitions/*.js"],
                dest: 'out/step_definitions.js'
            }
        },
        copy: {
            auth: {
                expand: true,
                flatten: true,
                src: [],
                dest: 'out/'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('build', function (extensionPath) {
        if (extensionPath) {
            var featurePath = extensionPath + '*.Extensions/**/*.feature';
            var authInfoPath = extensionPath + '*.Extensions/**/auth.js';

            var stepDefinitionsArray = grunt.config.get('concat.step_definitions.src');
            stepDefinitionsArray.push(extensionPath + '*.Extensions/**/step_definitions/*.js');

            grunt.config.set('concat.feature.src', [featurePath]);
            grunt.config.set('concat.step_definitions.src', stepDefinitionsArray);
            grunt.config.set('copy.auth.src', [authInfoPath]);
        }

         var tasks = [
            'concat',
            'copy'
         ];

        grunt.task.run(tasks);
    });
};