'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var config = require('./config');
var src = config.platformOutputFolder + "/" + config.platformJsOutputFile;

/**
 * Build platform.min.js.
 * This task you can use only after build:js, when platform.js is created
 *
 * @task {build:prod-js}
 * @group {Sub-tasks}
 */
gulp.task('build:prod-js', function() {
		return gulp.src( src )
		.pipe( $.replace(/\/\/devblockstart((?!devblock)[\s\S])*\/\/devblockstop/ig, '') )
		.pipe( $.rename({suffix: '.min'}) )
		.pipe( $.uglify() )
		.pipe( gulp.dest( config.platformOutputFolder ) );
	});