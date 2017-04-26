'use strict';

/*         Настраиваемые параметры              */

// Необходимо указать путь до платфомы в node_modules
var infinniUIpath = './node_modules/infinni-ui/';

// Путь до папки-результата
var projectRootFolder = './www/';
// куда собирать платформу?
var projectFolderForPlatform = './www/compiled/platform/';
// куда собирать прикладную часть?
var projectFolderForExtensions = './www/compiled/js/';
// куда собирать стили?
var projectFolderForStyles = './www/compiled/style/';
// где хранятся прикладные скрипты?
var jsFiles = ['./js/**/*.js'];
// где хранятся прикладные шаблоны?
var templateFiles = ['./js/**/*.tpl.html'];


/*                 Сборка                       */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var concatStream = require('streamqueue');
var browserSync = require('browser-sync').create('server:example');
var historyApiFallback = require('connect-history-api-fallback');

// если нужно минимизировать app.js, то установите NODE_ENV (под виндой вызвать SET NODE_ENV=production перед вызовом билда)
var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';


function buildLess( options ) {
	return gulp.src( options.src )
		   .pipe( $.less() )
		   .pipe( $.csso() ) // minify css
		   .pipe( $.autoprefixer({browsers: ['last 2 versions']}) )  // add prefixes for browsers (-webkit, -moz etc)
		   .pipe( gulp.dest( options.dest ) );
}

var templateNamespaceInitString = 'window["Example"] = window["Example"] || {};\nwindow["Example"]["Template"] = window["Example"]["Template"] || {};\n';

function getTemplateStream(src) {
    return gulp.src(src)
        .pipe( $.templateCompile({
            namespace: 'Example.Template',
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
		dest: projectFolderForStyles
	} );
});

gulp.task('build:platform-less', function() {
	return buildLess( {
		src: './styles/platform/overridden-platform.less',
		dest: projectFolderForStyles
	} );
});

gulp.task('build:js', function() {
	return concatStream( {objectMode: true}, getTemplateStream( templateFiles ), getJsStream( jsFiles ) )
            .pipe( $.concat( 'app.js' ) )
			.pipe($.wrapper({
				header: templateNamespaceInitString
			}))
            .pipe( $.if( !isDevelopment, $.uglify() ) )
            .pipe( gulp.dest( projectFolderForExtensions ) );
});

var platformSrc = infinniUIpath + '/dist/**/*.*';

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
