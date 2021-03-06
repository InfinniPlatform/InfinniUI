'use strict';

var gulp = require( 'gulp' );
var $ = require( 'gulp-load-plugins' )();
var concatStream = require( 'streamqueue' );

var config = require( './config' );
var platformVersion = require( '../../package.json' ).version;
var templateNamespaceInitString = 'window["InfinniUI"] = window["InfinniUI"] || {};\nwindow["InfinniUI"]["Template"] = window["InfinniUI"]["Template"] || {};\n';

function getTemplateStream( src ) {
    return gulp.src( src, { base: 'app' } )
        .pipe( $.templateCompile( {
            namespace: 'InfinniUI.Template',
            IIFE: false
        } ) )
        .pipe( $.replace( templateNamespaceInitString, '' ) )
        .pipe( $.replace( /\r*\n/g, '' ) );
}

function getJsStream( src ) {
    return gulp.src( src, { base: '.' } )
        .pipe( $.wrapper( {
            header: function( file ) {
                return '//####' + file.relative + '\n';
            }
        } ) );
}

/**
 * Build platform.js
 *
 * @task {build:js}
 * @group {Sub-tasks}
 */
gulp.task( 'build:js', function() {
    return concatStream( { objectMode: true }, getTemplateStream( config.templateFiles ), getJsStream( config.jsFiles ) )
        .pipe( $.concat( config.platformJsOutputFile ) )
        .pipe( $.wrapper( {
            header: ';(function(){\n' + templateNamespaceInitString,
            footer: '})();'
        } ) )
        .pipe( $.replace( /<%infinniui_version%>/g, platformVersion ) )
        .pipe( $.appendPrepend.prependFile( config.jsDependence ) ) // раз есть appendPrepend, то можно от wrapper избавиться
        .pipe( gulp.dest( config.platformOutputFolder ) );
} );
