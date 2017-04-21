'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var sourceForFiles = require('./sourceForFiles');

gulp.task('build:less',  function() {
		return gulp.src( sourceForFiles.stylesFiles )
		.pipe( $.less() )
		.pipe( $.csso() ) // minify css
		.pipe( $.autoprefixer({browsers: ['last 2 versions']}) )
		.pipe( gulp.dest( sourceForFiles.platformOutputFolder + "css/" ) )
	});
