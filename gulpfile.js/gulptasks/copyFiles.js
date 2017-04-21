'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var sourceForFiles = require('./sourceForFiles');

function copy(options) {
	return gulp.src(options.src, {base: options.base})
		.pipe($.newer(options.dest))
		.pipe(gulp.dest(options.dest))
}

gulp.task('copy:fonts', function () {
	return copy({
		src: sourceForFiles.fonts.src,
		base: sourceForFiles.fonts.base,
		dest: sourceForFiles.platformOutputFolder + 'fonts/'
	});
});

gulp.task('assemble:package', function () {
	return copy({
		src: sourceForFiles.package.src,
		base: sourceForFiles.package.base,
		dest: 'package/'
	});
});
