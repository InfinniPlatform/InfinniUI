'use strict';

var gulp = require( 'gulp' );
var $ = require( 'gulp-load-plugins' )();

module.exports = function( options ) {
    return function( callback ) {
        return gulp.src( options.src )
            .pipe( $.eslint() )
            .pipe( $.eslint.format() )
            .pipe( $.eslint.failAfterError() );
    };
};
