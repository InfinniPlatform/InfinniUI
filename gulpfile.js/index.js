'use strict';
var help = '';
var gulp = require( 'gulp' );
var watch = require( 'gulp-watch' );
var sourceForTasks = require( './gulptasks/sourceForTasks' );
var lazyRequireTask = function( taskName, path, options ) {
    options = options || {};
    options.taskName = taskName;
    gulp.task( taskName, function( callback ) {
        var task = require( path ).call( this, options );
        return task( callback );
    } );
};

for( var key in sourceForTasks ) {
    help += ('- gulp ' + key + '\n');
    lazyRequireTask( key, sourceForTasks[ key ].taskPath, sourceForTasks[ key ] );
}

gulp.task( 'build', gulp.series(
    'lint',
    gulp.parallel( 'concatJs', 'concatJsProd' ),
    'buildLess',
    'vendorJs',
    'concatTemplates',
    'unitTest',
    'vendorStyles',
    'fonts'
) );

gulp.task( 'fullWatch', function() {
    watch( sourceForTasks.buildLess.srcForWatch, gulp.series( 'buildLess' ) );
    watch( sourceForTasks.vendorStyles.src, gulp.series( 'vendorStyles' ) );
    watch( sourceForTasks.concatJs.src, gulp.series( 'concatJs' ) );
    watch( sourceForTasks.vendorJs.src, gulp.series( 'vendorJs' ) );
    watch( sourceForTasks.unitTest.src, gulp.series( 'unitTest' ) );
    watch( sourceForTasks.concatTemplates.src, gulp.series( 'concatTemplates' ) );
    watch( sourceForTasks.fonts.src, gulp.series( 'fonts' ) );
} );

gulp.task( 'run:tests', gulp.series(
    'build',
    'server:tests'
) );

gulp.task( 'run:dev', gulp.series(
    'build',
    gulp.parallel( 'fullWatch', 'server:tests' )
) );

gulp.task( 'default', function( cb ) {
    console.log( '####Task is not defined!\n' +
        '####Use any of defined tasks:\n' +
        help +
        '- gulp lint\n' +
        '- gulp build\n' +
        '- gulp run:tests\n' +
        '- gulp run:dev'
    );
    cb();
} );
