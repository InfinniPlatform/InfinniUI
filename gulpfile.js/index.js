'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var docHelper = require('gulp-help-doc');
var requireDir = require('require-dir');

var config = require('./gulptasks/config');

requireDir('./gulptasks'); // подключаем задачи из папки gulptasks

/**
 * Build platform (not minified)
 *
 * @task {build}
 * @group {Main}
 * @order {1}
 */
gulp.task('build', gulp.parallel(
	'build:js',
	'build:less',
	'concat:vendor-js',
	'concat:vendor-styles',
	'copy:fonts'
));

/**
 * Build production version of platform
 *
 * @task {build:prod}
 * @group {Main}
 * @order {2}
 */
gulp.task('build:prod', gulp.series(
		'build',
		'build:prod-js'
));

/**
 * Watch for changes and rebuild changed part
 *
 * @task {watch}
 * @group {Main}
 * @order {3}
 */
gulp.task('watch', function() {
	watch( config.stylesFilesForWatch, gulp.series('build:less') );
	watch( config.jsFiles, gulp.series('build:js') );
	watch( config.templateFiles, gulp.series('build:js') );
	watch( config.vendorStylesFiles, gulp.series('concat:vendor-styles') );
	watch( config.vendorJsFiles, gulp.series('concat:vendor-js') );
	watch( config.unitTestFiles, gulp.series('concat:unit-tests') );
	watch( config.fonts.src, gulp.series('copy:fonts') );
});


/**
 * Build and run unit tests
 *
 * @task {run:tests}
 * @group {Main}
 * @order {4}
 */
gulp.task('run:tests', gulp.series(
	'build',
	'concat:unit-tests',
	gulp.parallel('watch', 'server:tests')
));

gulp.task('help', function() {
	return docHelper(gulp);
});

gulp.task('default', gulp.parallel('help') );
