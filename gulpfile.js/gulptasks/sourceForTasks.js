'use strict';

var sourceForFiles = require('./sourceForFiles');

var sourceForTasks = {
	'clean': {
		src: sourceForFiles.platformOutputFolder,
		taskPath: "./gulptasks/clean"
	},
	'build:less': {
		src: sourceForFiles.stylesFiles,
		srcForWatch: sourceForFiles.stylesFilesForWatch,
		finalName: "main.css",
		dest: sourceForFiles.platformOutputFolder + "css/",
		taskPath: "./gulptasks/buildLess"
	},
	'assemble:package': {
		base: sourceForFiles.package.base,
		src: sourceForFiles.package.src,
		dest: "package/",
		taskPath: "./gulptasks/copyFiles"
	},
	'build:js': {
		src: sourceForFiles.jsFiles,
		finalName: "platform.js",
		dest: sourceForFiles.platformOutputFolder,
		taskPath: "./gulptasks/concatJs"
	},
	'build:prod-js': {
		src: sourceForFiles.jsFiles,
		finalName: "platform.min.js",
		dest: sourceForFiles.platformOutputFolder,
		taskPath: "./gulptasks/concatJsProd"
	},
	'concat:vendor-styles': {
		src: sourceForFiles.vendorStylesFiles,
		finalName: "vendor.css",
		dest: sourceForFiles.platformOutputFolder + "css",
		taskPath: "./gulptasks/concatFiles"
	},
	'concat:vendor-js': {
		src: sourceForFiles.vendorJsFiles,
		finalName: "vendor.js",
		uglifyJs: true,
		dest: sourceForFiles.platformOutputFolder,
		taskPath: "./gulptasks/concatFiles"
	},
	'test:unit': {
		src: sourceForFiles.unitTestFiles,
		finalName: "unitTest.js",
		dest: sourceForFiles.platformOutputFolder,
		taskPath: "./gulptasks/concatFiles"
	},
	'concat:templates': {
		src: sourceForFiles.templateFiles,
		finalName: "templates.js",
		dest: sourceForFiles.platformOutputFolder,
		taskPath: "./gulptasks/concatTemplates"
	},
	'fonts': {
		base: sourceForFiles.fonts.base,
		src: sourceForFiles.fonts.src,
		dest: sourceForFiles.platformOutputFolder + "fonts/",
		taskPath: "./gulptasks/copyFiles"
	},
	'server:tests': {
		src: ".",
		watch: sourceForFiles.platformOutputFolder + "**/*.*",
		port: 5555,
		startPath: "/test/unit/",
		taskPath: "./gulptasks/startServer"
	}
}

module.exports = sourceForTasks;
