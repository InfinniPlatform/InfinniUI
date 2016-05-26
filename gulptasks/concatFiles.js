'use strict';

const gulp = require('gulp'),
			$ = require('gulp-load-plugins')();

module.exports = function(options) {
	return function() {
		return gulp.src(options.src)
			// .pipe($.newer(options.dest + options.finalName))
			.pipe($.concat(options.finalName))
			.pipe($.if(options.uglifyJs, $.uglify()))
			.pipe(gulp.dest(options.dest))
	};
};
