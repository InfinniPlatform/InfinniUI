'use strict';

var gulp = require('gulp'),
			$ = require('gulp-load-plugins')();

module.exports = function(options) {
	return function() {
		return gulp.src(options.src)
			// .pipe($.newer(options.dest + options.finalName))
			.pipe($.replace(/\/\/devblockstart((?!devblock)[\s\S])*\/\/devblockstop/ig, ''))
			.pipe($.concat(options.finalName))
			.pipe($.uglify())
			.pipe($.wrapper({
				header: ';(function(){',
				footer: '})();'
			}))
			.pipe(gulp.dest(options.dest))
	};
};
