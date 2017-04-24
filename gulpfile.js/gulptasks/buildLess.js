'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('./config');

gulp.task('build:less',  function() {
		return gulp.src( config.stylesFiles )
		.pipe( $.less() )
		.pipe( $.csso() ) // minify css
		.pipe( $.autoprefixer({browsers: ['last 2 versions']}) )
		.pipe( gulp.dest( config.platformOutputFolder + "css/" ) )
	});
