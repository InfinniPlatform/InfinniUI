'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('./config');

function concat(options) {
	return gulp.src(options.src)
	.pipe( $.if( function( file ) { return file.relative.indexOf('min\.') === -1 && options.isNeedUglifyJs; }, $.uglify() ) )
	.pipe( $.concat( options.finalName ) )
	.pipe( gulp.dest( options.dest ) );
}


gulp.task('concat:vendor-js', function () {
	return concat({
		src: config.vendorJsFiles,
		finalName: 'vendor.js',
		dest: config.platformOutputFolder,
		isNeedUglifyJs: true
	});
});

gulp.task('concat:vendor-styles', function () {
	return concat({
		src: config.vendorStylesFiles,
		finalName: 'vendor.css',
		dest: config.platformOutputFolder + 'css'
	});
});

gulp.task('concat:unit-tests', function () {
	return concat({
		src: config.unitTestFiles,
		finalName: 'unitTest.js',
		dest: config.testOutputFolder
	});
});