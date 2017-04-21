'use strict';

var gulp = require('gulp');
var del = require('del');
var sourceForFiles = require('./sourceForFiles');

function clean(folderPath) {
	return del(folderPath);
}

gulp.task('clean', function() {
	return clean( [ sourceForFiles.platformOutputFolder, sourceForFiles.testOutputFolder] );
});
