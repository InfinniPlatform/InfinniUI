'use strict';

var gulp = require('gulp'),
			$ = require('gulp-load-plugins')(),
			combiner = require('stream-combiner2').obj;

module.exports = function(options) {
	return function(callback) {
		return combiner(
			gulp.src(options.src),
			$.less(),
			$.csso(), // minify css
			$.autoprefixer({browsers: ['last 2 versions']}),
			gulp.dest(options.dest)
		).on('error', $.notify.onError({
				title: options.taskName
		}));
	};
};
