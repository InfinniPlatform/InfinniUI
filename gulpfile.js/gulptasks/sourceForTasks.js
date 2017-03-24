'use strict';

var sourceForFiles = require('./sourceForFiles');

var sourceForTasks = {
	cleanFolder: {
		src: sourceForFiles.platformOutputFolder,
		taskPath: "./gulptasks/cleanFolder"
	},
	buildLess: {
		src: sourceForFiles.stylesFiles,
		srcForWatch: sourceForFiles.stylesFilesForWatch,
		finalName: "main.css",
		dest: sourceForFiles.platformOutputFolder + "css/",
		taskPath: "./gulptasks/buildLess"
	},
	concatJs: {
		src: sourceForFiles.jsFiles,
		finalName: "platform.js",
		dest: sourceForFiles.platformOutputFolder,
		taskPath: "./gulptasks/concatJs"
	},
	concatJsProd: {
		src: sourceForFiles.jsFiles,
		finalName: "platform.min.js",
		dest: sourceForFiles.platformOutputFolder,
		taskPath: "./gulptasks/concatJsProd"
	},
	vendorStyles: {
		src: sourceForFiles.vendorStylesFiles,
		finalName: "vendor.css",
		dest: sourceForFiles.platformOutputFolder + "css",
		taskPath: "./gulptasks/concatFiles"
	},
	vendorJs: {
		src: sourceForFiles.vendorJsFiles,
		finalName: "vendor.js",
		uglifyJs: true,
		dest: sourceForFiles.platformOutputFolder,
		taskPath: "./gulptasks/concatFiles"
	},
	unitTest: {
		src: sourceForFiles.unitTestFiles,
		finalName: "unitTest.js",
		dest: sourceForFiles.platformOutputFolder,
		taskPath: "./gulptasks/concatFiles"
	},
	concatTemplates: {
		src: sourceForFiles.templateFiles,
		finalName: "templates.js",
		dest: sourceForFiles.platformOutputFolder,
		taskPath: "./gulptasks/concatTemplates"
	},
	fonts: {
		src: sourceForFiles.fontsFiles,
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
