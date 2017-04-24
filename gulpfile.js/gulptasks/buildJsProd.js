'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var config = require('./config');
var src = config.platformOutputFolder + "/" + config.platformJsOutputFile;

gulp.task('build:prod-js', function() {
		return gulp.src( src )
		.pipe( $.replace(/\/\/devblockstart((?!devblock)[\s\S])*\/\/devblockstop/ig, '') )
		.pipe( $.rename({suffix: '.min'}) )
		.pipe( $.uglify() )
		.pipe( gulp.dest( config.platformOutputFolder ) );
	});