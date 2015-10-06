module.exports = function (grunt) {
	grunt.initConfig({
        concat: {
            feature: {
                src: ["features/*.feature"],
                dest: 'out/feature.feature'
            },
			
			step_definitions: {
                src: ["features/support/*.js", "features/step_definitions/*.js"],
                dest: 'out/step_definitions.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['concat']);
};