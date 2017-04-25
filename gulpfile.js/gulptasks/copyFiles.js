'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('./config');

function copy(options) {
	return gulp.src(options.src, {base: options.base})
		.pipe($.newer(options.dest))
		.pipe(gulp.dest(options.dest))
}

/**
 * The copy used in platform fonts to output directory
 *
 * @task {copy:fonts}
 * @group {Sub-tasks}
 */
gulp.task('copy:fonts', function () {
	return copy({
		src: config.fonts.src,
		base: config.fonts.base,
		dest: config.platformOutputFolder + 'fonts/'
	});
});

/**
 * Assembles everything that is necessary for package to one directory
 *
 * @task {assemble:package}
 * @group {Sub-tasks}
 */
gulp.task('assemble:package', function () {
	return copy({
		src: config.package.src,
		base: config.package.base,
		dest: 'package/'
	});
});
