'use strict';

var gulp = require( 'gulp' );
var $ = require( 'gulp-load-plugins' )();
var config = require( './config' );

function concat( options ) {
    return gulp.src( options.src )
        .pipe( $.if( function( file ) {
            return file.relative.indexOf( 'min\.' ) === -1 && options.isNeedUglifyJs;
        }, $.uglify() ) )
        .pipe( $.concat( options.finalName ) )
        .pipe( gulp.dest( options.dest ) );
}

/**
 * Concat vendor.js
 *
 * @task {concat:vendor-js}
 * @group {Sub-tasks}
 */
gulp.task( 'concat:vendor-js', function() {
    return concat( {
        src: config.vendorJsFiles,
        finalName: 'vendor.js',
        dest: config.platformOutputFolder,
        isNeedUglifyJs: true
    } );
} );

/**
 * Concat vendor.css
 *
 * @task {concat:vendor-styles}
 * @group {Sub-tasks}
 */
gulp.task( 'concat:vendor-styles', function() {
    return concat( {
        src: config.vendorStylesFiles,
        finalName: 'vendor.css',
        dest: config.platformOutputFolder + 'css'
    } );
} );
