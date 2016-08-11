'use strict';

var gulp = require('gulp'),
			$ = require('gulp-load-plugins')();

module.exports = function(options) {
	return function() {
		return gulp.src(options.src)
			.pipe($.concat(options.finalName))
			.pipe($.if(options.uglifyJs, $.uglify()))
			.pipe(gulp.dest(options.dest))
	};
};
