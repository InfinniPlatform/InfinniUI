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
	gulp.parallel('concatJs', 'concatJsProd'),
	'buildLess',
	'vendorJs',
	'concatTemplates', 
	'unitTest', 
	'vendorStyles',
	'fonts'
));

gulp.task('build-dev', gulp.series(
	'concatJs',
	'buildLess',
	'vendorJs',
	'concatTemplates', 
	'unitTest', 
	'vendorStyles',
	'fonts'
));

gulp.task('fullWatch', function() {
	watch(sourceForTasks.buildLess.srcForWatch, gulp.series('buildLess'));
	watch(sourceForTasks.vendorStyles.src, gulp.series('vendorStyles'));
	watch(sourceForTasks.concatJs.src, gulp.series('concatJs'));
	watch(sourceForTasks.vendorJs.src, gulp.series('vendorJs'));
	watch(sourceForTasks.unitTest.src, gulp.series('unitTest'));
	watch(sourceForTasks.concatTemplates.src, gulp.series('concatTemplates'));
	watch(sourceForTasks.fonts.src, gulp.series('fonts'));
});

gulp.task('runTests', gulp.series(
	'build-dev',
	'server:tests'
));

gulp.task('runDev', gulp.series(
	'build-dev',
	gulp.parallel('fullWatch', 'server:tests')
));

gulp.task('default', function(cb) {
	console.log('####Task is not defined!\n' +
							'####Use any of defined tasks:\n' +
							help +
							'- gulp build\n' +
							'- gulp build-dev\n' +
							'- gulp runTests\n' +
							'- gulp runDev'
							);
	cb();
});
