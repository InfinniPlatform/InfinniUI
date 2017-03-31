'use strict';
var help = '';
var gulp = require('gulp'),
			watch = require('gulp-watch'),
			sourceForTasks = require('./gulptasks/sourceForTasks'),
			lazyRequireTask = function(taskName, path, options) {
				options = options || {};
				options.taskName = taskName;
				gulp.task(taskName, function(callback) {
					var task = require(path).call(this, options);
					return task(callback);
				});
			};

for(var key in sourceForTasks) {
	help += ('- gulp ' + key + '\n');
	lazyRequireTask(key, sourceForTasks[key].taskPath, sourceForTasks[key]);
}

gulp.task('build', gulp.parallel(
	'build:js',
	'build:less',
	'concat:vendor-js',
	'concat:vendor-styles',
	'concat:unit-tests',
	'copy:fonts'
));

gulp.task('build:prod', gulp.series(
		'build',
		'build:prod-js'
));

gulp.task('full-watch', function() {
	watch(sourceForTasks['build:less'].srcForWatch, gulp.series('build:less'));
	watch(sourceForTasks['build:js'].src, gulp.series('build:js'));
	watch(sourceForTasks['build:js'].templateSrc, gulp.series('build:js'));
	watch(sourceForTasks['concat:vendor-styles'].src, gulp.series('concat:vendor-styles'));
	watch(sourceForTasks['concat:vendor-js'].src, gulp.series('concat:vendor-js'));
	watch(sourceForTasks['concat:unit-tests'].src, gulp.series('concat:unit-tests'));
	watch(sourceForTasks['copy:fonts'].src, gulp.series('copy:fonts'));
});

gulp.task('run:tests', gulp.series(
	'build',
	'server:tests'
));

gulp.task('run:dev', gulp.series(
	'build',
	gulp.parallel('full-watch', 'server:tests')
));

gulp.task('default', function(cb) {
	console.log('####Task is not defined!\n' +
							'####Use any of defined tasks:\n' +
							help +
							'- gulp build\n' +
							'- gulp build:prod\n' +
							'- gulp run:tests\n' +
							'- gulp run:dev'
							);
	cb();
});
