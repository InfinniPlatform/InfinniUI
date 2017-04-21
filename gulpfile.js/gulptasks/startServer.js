'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create('server:tests');
var sourceForFiles = require('./sourceForFiles');

function startServer(options) {
	browserSync.init({
		server: options.src,
		port: options.port,
		ui: false,
		startPath: options.startPath
	});
	browserSync.watch(options.watch).on('change', browserSync.reload);
}

gulp.task('server:tests', function () {
	return startServer({
		src: '.',
		watch: sourceForFiles.platformOutputFolder + '**/*.*',
		port: 5555,
		startPath: '/test/unit/'
	});
});
