'use strict';

var gulp = require( 'gulp' ),
    $ = require( 'gulp-load-plugins' )(),
    through2 = require( 'through2' ).obj,
    combiner = require( 'stream-combiner2' ).obj;

module.exports = function( options ) {
    return function() {
        return combiner(
            gulp.src( options.src ),
            $.if( function( file ) {
                return file.relative.indexOf( 'min\.' ) === -1 && options.uglifyJs;
            }, $.uglify() ),
            $.concat( options.finalName ),
            gulp.dest( options.dest )
        ).on( 'error', $.notify.onError( {
            title: options.taskName
        } ) );

    };
};
