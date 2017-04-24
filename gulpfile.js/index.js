'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var requireDir = require('require-dir');

var config = require('./gulptasks/config');

requireDir('./gulptasks'); // подключаем задачи из папки gulptasks

gulp.task('build', gulp.parallel(
	'build:js',
	'build:less',
	'concat:vendor-js',
	'concat:vendor-styles',
	'copy:fonts'
));

gulp.task('build:prod', gulp.series(
		'build',
		'build:prod-js'
));

gulp.task('watch', function() {
	watch( config.stylesFilesForWatch, gulp.series('build:less') );
	watch( config.jsFiles, gulp.series('build:js') );
	watch( config.templateFiles, gulp.series('build:js') );
	watch( config.vendorStylesFiles, gulp.series('concat:vendor-styles') );
	watch( config.vendorJsFiles, gulp.series('concat:vendor-js') );
	watch( config.unitTestFiles, gulp.series('concat:unit-tests') );
	watch( config.fonts.src, gulp.series('copy:fonts') );
});

gulp.task('run:tests', gulp.series(
	'build',
	'concat:unit-tests',
	gulp.parallel('watch', 'server:tests')
));

gulp.task('default', function(cb) {
	console.log('####Task is not defined!\n' +
							'####Use any of defined tasks:\n' +
							'- gulp build\n' +
							'- gulp build:prod\n' +
							'- gulp run:tests'
							);
	cb();
});
