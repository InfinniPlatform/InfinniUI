'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var concatStream = require('streamqueue');
var browserSync = require('browser-sync').create('server:example');
var historyApiFallback = require('connect-history-api-fallback');
var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

// Необходимо указать путь до платфомы в node_modules
var infinniUIpath = './node_modules/infinni-ui/';

// Путь до папки-результата
var projectRootFolder = './www/';
// куда собирать платформу?
var projectFolderForPlatform = './www/compiled/platform/';
// куда собирать прикладную часть?
var projectFolderForExtensions = './www/compiled/js/';


// Платформенные перменные (не рекомендуется менять)
var platformOutputFolder = '/dist/';
var stylesFile = '/app/styles/main.less';

var jsFiles = ['./js/**/*.js'];
var templateFiles = ['./js/**/*.tpl.html'];

function buildLess( options ) {
	return gulp.src( options.src )
		   .pipe( $.less() )
		   .pipe( $.myth() )
		   .pipe( $.csso() )
		   .pipe( $.autoprefixer({browsers: ['last 2 versions']}) )
		   .pipe( gulp.dest( options.dest ) );
}

var templateNamespaceInitString = 'window["InfinniUI"] = window["InfinniUI"] || {};\nwindow["InfinniUI"]["Template"] = window["InfinniUI"]["Template"] || {};\n';

function getTemplateStream(src) {
    return gulp.src(src)
        .pipe( $.templateCompile({
            namespace: 'InfinniUI.Template',
            IIFE: false
        }) )
        .pipe( $.replace(templateNamespaceInitString, '') )
        .pipe( $.replace(/\r*\n/g, '') );
}

function getJsStream(src) {
    return gulp.src( src, {base: '.'} )
        .pipe( $.wrapper({
            header: function (file) {
                return '//####' + file.relative + '\n';
            }
        }) );
}

gulp.task('clean', function() {
	return del( projectFolderForPlatform );
});

gulp.task('build:less', function() {
	return buildLess( {
		src: './styles/main.less',
		dest: './www/compiled/style'
	} );
});

gulp.task('build:platform-less', function() {
	return buildLess( {
		src: './styles/platform/overridden-platform.less',
		dest: './www/compiled/style'
	} );
});

gulp.task('build:js', function() {
	return concatStream( {objectMode: true}, getTemplateStream( templateFiles ), getJsStream( jsFiles ) )
            .pipe( $.concat( 'app.js' ) )
            .pipe( $.if( !isDevelopment, $.uglify() ) )
            .pipe( gulp.dest( projectFolderForExtensions ) );
});

var platformSrc = [
				infinniUIpath + platformOutputFolder + '**/*.*', 
				'!' + infinniUIpath + platformOutputFolder + 'unitTest.js'
			];
gulp.task('copy:platform', function() {
	return gulp.src(platformSrc)
		   .pipe(gulp.dest( projectFolderForPlatform ));
});

gulp.task('server:example', function() {
	browserSync.init({
			server: { 
				baseDir: './www',
				middleware: [ historyApiFallback() ]
			},
			port: 4444,
			ui: {
				port: 4040
			}
		});
	browserSync.watch( projectRootFolder + '**/*.*' ).on( 'change', browserSync.reload);
});

gulp.task('build', gulp.parallel(
		gulp.series( 'copy:platform', 'build:platform-less' ),
		'build:js',
		'build:less'
));

gulp.task('watch', function() {
	$.watch( platformSrc, gulp.series('copy:platform', 'build:platform-less') );
	$.watch( './styles/platform/', gulp.series('build:platform-less') );
	$.watch( jsFiles, gulp.series('build:js') );
	$.watch( templateFiles, gulp.series('build:js') );
	$.watch( './styles/' , gulp.series('build:less') );
});

gulp.task('example', gulp.series(
	'build',
	gulp.parallel('watch', 'server:example')
));

gulp.task('default', function(cb) {
	console.log('####Task is not defined!\n' +
							'####Use any of defined tasks:\n' +
							'- gulp build\n' +
							'- gulp example'
							);
	cb();
});
