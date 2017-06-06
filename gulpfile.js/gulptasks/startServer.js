'use strict';

var browserSync = require( 'browser-sync' ).create( 'server:tests' );

module.exports = function( options ) {
    return function( callback ) {
        browserSync.init( {
            server: options.src,
            port: options.port,
            ui: false,
            startPath: options.startPath
        } );
        browserSync.watch( options.watch ).on( 'change', browserSync.reload );
    };
};
