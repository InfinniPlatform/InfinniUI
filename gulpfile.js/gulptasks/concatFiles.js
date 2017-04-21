'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var sourceForFiles = require('./sourceForFiles');

function concat(options) {
	return gulp.src(options.src)
	.pipe( $.if( function( file ) { return file.relative.indexOf('min\.') === -1 && options.isNeedUglifyJs; }, $.uglify() ) )
	.pipe( $.concat( options.finalName ) )
	.pipe( gulp.dest( options.dest ) );
}


gulp.task('concat:vendor-js', function () {
	return concat({
		src: sourceForFiles.vendorJsFiles,
		finalName: 'vendor.js',
		dest: sourceForFiles.platformOutputFolder,
		isNeedUglifyJs: true
	});
});

gulp.task('concat:vendor-styles', function () {
	return concat({
		src: sourceForFiles.vendorStylesFiles,
		finalName: 'vendor.css',
		dest: sourceForFiles.platformOutputFolder + 'css'
	});
});

gulp.task('concat:unit-tests', function () {
	return concat({
		src: sourceForFiles.unitTestFiles,
		finalName: 'unitTest.js',
		dest: sourceForFiles.testOutputFolder
	});
});