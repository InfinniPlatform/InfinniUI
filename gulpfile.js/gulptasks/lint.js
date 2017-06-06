'use strict';

var gulp = require( 'gulp' );
var $ = require( 'gulp-load-plugins' )();
var config = require( './config' );

/**
 * @description check code style
 * @task lint
 * @group {Sub-tasks}
 */
gulp.task( 'lint', function() {
    return gulp.src( config.lintFiles )
        .pipe( $.eslint() )
        .pipe( $.eslint.format() )
        .pipe( $.eslint.failAfterError() );
} );
