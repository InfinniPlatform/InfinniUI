'use strict';

const gulp = require('gulp'),
			$ = require('gulp-load-plugins')(),
			combiner = require('stream-combiner2').obj;

module.exports = function(options) {
	return function(callback) {
		return combiner(
			gulp.src(options.src, {base: '.'}),
			// $.newer(options.dest + options.finalName),
			$.wrapper({
				header: function(file) {
					return '//####' + file.relative + '\n';
				}
			}),
			$.concat(options.finalName),
			gulp.dest(options.dest)
		).on('error', $.notify.onError({
				title: 'concatJs'
		}));
	};
};
