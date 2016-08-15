'use strict';

var gulp = require('gulp'),
		combiner = require('stream-combiner2').obj,
		$ = require('gulp-load-plugins')();

module.exports = function(options) {
	return function() {
		return combiner(
			gulp.src(options.src),
			$.replace(/\/\/devblockstart((?!devblock)[\s\S])*\/\/devblockstop/ig, ''),
			$.concat(options.finalName),
			$.uglify(),
			$.wrapper({
				header: ';(function(){',
				footer: '})();'
			}),
			gulp.dest(options.dest)
		).on('error', $.notify.onError({
			title: options.taskName
		}));
	};
};
