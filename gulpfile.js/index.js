'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var taskListing = require('gulp-task-listing');
var requireDir = require('require-dir');

var sourceForFiles = require('./gulptasks/sourceForFiles');

requireDir('./gulptasks'); // подключаем задачи из папки gulptasks

gulp.task('build', gulp.parallel(
	'build:js',
	'build:less',
	'concat:vendor-js',
	'concat:vendor-styles',
	'copy:fonts'
));

gulp.task('build:prod', gulp.series(
		'build',
		'build:prod-js'
));

gulp.task('watch', function() {
	watch( sourceForFiles.stylesFilesForWatch, gulp.series('build:less') );
	watch( sourceForFiles.jsFiles, gulp.series('build:js') );
	watch( sourceForFiles.templateFiles, gulp.series('build:js') );
	watch( sourceForFiles.vendorStylesFiles, gulp.series('concat:vendor-styles') );
	watch( sourceForFiles.vendorJsFiles, gulp.series('concat:vendor-js') );
	watch( sourceForFiles.unitTestFiles, gulp.series('concat:unit-tests') );
	watch( sourceForFiles.fonts.src, gulp.series('copy:fonts') );
});

gulp.task('run:tests', gulp.series(
	'build',
	'concat:unit-tests',
	gulp.parallel('watch', 'server:tests')
));

gulp.task('default', function(cb) {
	console.log('####Task is not defined!\n' +
							'####Use any of defined tasks:\n' +
							help +
							'- gulp build\n' +
							'- gulp build:prod\n' +
							'- gulp run:tests'
							);
	cb();
});
