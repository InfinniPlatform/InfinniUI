'use strict';

const gulp = require('gulp'),
			$ = require('gulp-load-plugins')();

module.exports = function(options) {
	return function() {
		return gulp.src(options.src)
			.pipe($.newer(options.dest))
			.pipe(gulp.dest(options.dest))
	};
};
