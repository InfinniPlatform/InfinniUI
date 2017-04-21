'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var sourceForFiles = require('./sourceForFiles');
var src = sourceForFiles.platformOutputFolder + "/" + sourceForFiles.platformJsOutputFile;

gulp.task('build:prod-js', function() {
		return gulp.src( src )
		.pipe( $.replace(/\/\/devblockstart((?!devblock)[\s\S])*\/\/devblockstop/ig, '') )
		.pipe( $.rename({suffix: '.min'}) )
		.pipe( $.uglify() )
		.pipe( gulp.dest( sourceForFiles.platformOutputFolder ) );
	});