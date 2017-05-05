'use strict';

var gulp = require( 'gulp' );
var del = require( 'del' );
var config = require( './config' );

function clean( folderPath ) {
    return del( folderPath );
}

/**
 * Delete compiled files
 *
 * @task {clean}
 * @group {Main}
 * @order {0}
 *
 */
gulp.task( 'clean', function() {
    return clean( [ config.platformOutputFolder, config.package.dest ] );
} );
