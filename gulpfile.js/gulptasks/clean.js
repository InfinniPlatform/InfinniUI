'use strict';

var gulp = require('gulp');
var del = require('del');
var config = require('./config');

function clean(folderPath) {
	return del(folderPath);
}

gulp.task('clean', function() {
	return clean( [ config.platformOutputFolder, config.testOutputFolder] );
});
