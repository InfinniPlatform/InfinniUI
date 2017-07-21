'use strict';

/*============= Настраиваемые параметры =============*/

// Путь до папки-результата
var projectRootFolder = './www/';
// куда собирать прикладную часть?
var projectFolderForExtensions = './www/js/';
// куда собирать стили?
var projectFolderForStyles = './www/style/';
// где хранятся шрифты?
var projectFolderForFonts = './www/fonts/';
// где хранятся прикладные скрипты?
var jsFiles = [ './js/**/*.js' ];
// где хранятся прикладные шаблоны?
var templateFiles = [ './js/**/*.tpl.html' ];
// внешние зависимости
var vendorJsFiles = [
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/underscore/underscore-min.js',
    'node_modules/backbone/backbone.js',
    'node_modules/moment/min/moment.min.js',
    'node_modules/block-ui/jquery.blockUI.js',
    'node_modules/toastr/build/toastr.min.js',
    'node_modules/jquery.cookie/jquery.cookie.js',
    'node_modules/signalr/jquery.signalR.min.js',
    'node_modules/infinni-ui/dist/infinni-ui.min.js'
];


/*=================== Сборка ===================*/

/**
 *  Возможные модификации сборки:
 *  1) если Вы не используете шаблоны в своих элементах, то
 *     метод getTemplateStream можно вырезать, так же как и переменную templateFiles
 *     убрать watch для шаблонов
 *     в build:js вместо concatStream(...) использовать действия из getJsStream (выносить в отдельную функцию тоже в таком случае смысла нет)
 *     избавиться от gulp-template-compile и streamqueue
 *  2) если Вы не переопределяете платформенные стили, то
 *     от метода build:platform-less и его watch'ов можно избавиться
 *     от папки ./styles/platform/ тоже
 *     стили можно подключить из /node_modules/infinni-ui/dist/css/, node_modules/font-awesome/css/font-awesome.min.css, node_modules/toastr/build/toastr.min.css
 *  3) если Вы не хотите, чтобы приложение работало как SPA-приложение
 *     в задаче 'server:example' в поле server вместо объекта просто укажите строку './www'
 *     connect-history-api-fallback больше не нужен, от него можно избавиться
 *     если Вы используйте роутинг, то проследите, чтобы pushState был отключен
 */
var gulp = require( 'gulp' );
var $ = require( 'gulp-load-plugins' )();
var del = require( 'del' );
var concatStream = require( 'streamqueue' );
var browserSync = require( 'browser-sync' ).create( 'server:example' );
var historyApiFallback = require( 'connect-history-api-fallback' );

function buildLess( options ) {
    return gulp.src( options.src )
        .pipe( $.less() )
        .pipe( $.csso() ) // minify css
        .pipe( $.autoprefixer( { browsers: [ 'last 2 versions' ] } ) )  // add prefixes for browsers (-webkit, -moz etc)
        .pipe( gulp.dest( options.dest ) );
}

function concat( options ) {
    return gulp.src( options.src )
        .pipe( $.if( function( file ) {
            return file.extname === '.js' && file.relative.indexOf( 'min\.' ) === -1;
        }, $.uglify() ) )
        .pipe( $.concat( options.finalName ) )
        .pipe( gulp.dest( options.dest ) );
}

/**
 * Собирает шаблоны кастомных (здесь и далее под словом кастомные подразумеваются не относящие к платформе) элементов
 * [если Вам это ни к чему, см выше, как избавиться]
 * @param src массив путей с шаблонами
 * @returns {stream} - поток с шаблонами
 */
function getTemplateStream( src ) {
    return gulp.src( src )
        .pipe( $.templateCompile( {
            namespace: 'Example.Template',
            IIFE: false
        } ) )
        .pipe( $.replace( /\r*\n/g, '' ) );
}

/**
 * Объединяет кастомные скрипты
 * @param src массив путей кастомных скриптов
 * @returns {stream} - поток с кастомными скриптами
 */
function getJsStream( src ) {
    return gulp.src( src, { base: '.' } )
        .pipe( $.wrapper( {
            header: function( file ) {
                return '//####' + file.relative + '\n';
            }
        } ) );
}

/**
 * Удаляет папки-результаты
 */
gulp.task( 'clean', function() {
    return del( [ projectFolderForExtensions, projectFolderForStyles, projectFolderForFonts ] );
} );

/**
 * Собирает кастомные стили
 */
gulp.task( 'build:less', function() {
    return buildLess( {
        src: './styles/main.less',
        dest: projectFolderForStyles
    } );
} );

/**
 * Переопределяет платформенные стили с новыми значениями переменных [если Вам это ни к чему, см выше, как избавиться]
 */
gulp.task( 'build:platform-less', function() {
    return buildLess( {
        src: './styles/platform/overridden-platform.less',
        dest: projectFolderForStyles
    } );
} );

/**
 * Собирает в один файл все кастомные скрипты
 * Если хотите минимизировать этот файл, укажите при запуске параметр --production
 */
gulp.task( 'build:js', function() {
    return concatStream( { objectMode: true }, getTemplateStream( templateFiles ), getJsStream( jsFiles ) )
        .pipe( $.concat( 'app.js' ) )
        .pipe( $.if( $.util.env.production, $.uglify() ) )
        .pipe( gulp.dest( projectFolderForExtensions ) );
} );

/**
 * Собирает в один файл все внешние зависимости
 */
gulp.task( 'concat:vendor-js', function() {
    return concat( {
        src: vendorJsFiles,
        finalName: 'vendor.js',
        dest: projectFolderForExtensions
    } );
} );

/**
 * Копирует шрифты
 * шрифты должны быть на уровень выше стилей font-awesome(у нас эти стили включены в overridden-platform) в папке fonts
 */
gulp.task( 'copy:fonts', function() {
    return gulp.src( 'node_modules/font-awesome/fonts/*.*' )
        .pipe( gulp.dest( projectFolderForFonts ) );
} );

/**
 * Запускает сервер
 * если Вы не хотите, чтобы приложение работало как SPA-приложение, см выше инструкцию, как это изменить
 */
gulp.task( 'server:example', function() {
    browserSync.init( {
        server: {
            baseDir: './www',
            middleware: [ historyApiFallback() ]
        },
        port: 4444,
        ui: {
            port: 4040
        }
    } );
    browserSync.watch( projectRootFolder + '**/*.*' ).on( 'change', browserSync.reload );
} );

gulp.task( 'copyLauncher', function() {
    return gulp.src( 'launcher/**/*.*' )
        .pipe( $.versionAppend( ['html', 'js', 'css'], { appendType: 'version' } ) )
        .pipe( gulp.dest( projectRootFolder ) );
} );

gulp.task( 'build', gulp.parallel(
    'concat:vendor-js',
    'copy:fonts',
    'build:platform-less',
    'build:js',
    'build:less',
    'copyLauncher'
) );

gulp.task( 'watch', function() {
    $.watch( './styles/platform/', gulp.series( 'build:platform-less' ) );
    $.watch( jsFiles, gulp.series( 'build:js' ) );
    $.watch( templateFiles, gulp.series( 'build:js' ) );
    $.watch( './styles/', gulp.series( 'build:less' ) );
} );

gulp.task( 'example', gulp.series(
    'clean',
    'build',
    gulp.parallel( 'watch', 'server:example' )
) );

gulp.task( 'default', function( cb ) {
    console.log( '####Task is not defined!\n' +
        '####Use any of defined tasks:\n' +
        '- gulp build\n' +
        '- gulp example'
    );
    cb();
} );
