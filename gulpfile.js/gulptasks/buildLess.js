'use strict';

var gulp = require('gulp'),
			$ = require('gulp-load-plugins')(),
			combiner = require('stream-combiner2').obj,

			isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function(options) {
	return function(callback) {
		return combiner(
			gulp.src(options.src),
			$.if(isDevelopment, $.sourcemaps.init()),
			$.less(),
			$.myth(),
			$.csso(),
			$.autoprefixer({browsers: ['last 2 versions']}),
			$.concat(options.finalName),
			$.if(isDevelopment, $.sourcemaps.write()),
			gulp.dest(options.dest)
		).on('error', $.notify.onError({
				title: 'buildLess'
		}));
	};
};