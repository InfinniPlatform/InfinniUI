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

gulp.task('build', gulp.series(
	gulp.parallel('build:js', 'build:prod-js'),
	'build:less',
	'concat:vendor-js',
	'concat:templates',
	'test:unit',
	'concat:vendor-styles',
	'fonts'
));

gulp.task('full-watch', function() {
	watch(sourceForTasks.buildLess.srcForWatch, gulp.series('build:less'));
	watch(sourceForTasks.vendorStyles.src, gulp.series('concat:vendor-styles'));
	watch(sourceForTasks.concatJs.src, gulp.series('build:js'));
	watch(sourceForTasks.vendorJs.src, gulp.series('concat:vendor-js'));
	watch(sourceForTasks.unitTest.src, gulp.series('test:unit'));
	watch(sourceForTasks.concatTemplates.src, gulp.series('concat:templates'));
	watch(sourceForTasks.fonts.src, gulp.series('fonts'));
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
							'- gulp run:tests\n' +
							'- gulp run:dev'
							);
	cb();
});
