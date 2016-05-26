'use strict';

const sourceForFiles = require('./sourceForFiles');

const jsFilesForDevMode = sourceForFiles.jsFiles
	.slice()
	.join()
	.replace('!', sourceForFiles.devModeFiles.concatToPlatform.src + ',!')
	.split(',');

const sourceForTasks = {
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
		src: jsFilesForDevMode,
		finalName: "platform.js",
		dest: sourceForFiles.platformOutputFolder,
		taskPath: "./gulptasks/concatJs"
	},
	concatJsProd: {
		src: sourceForFiles.jsFiles,
		finalName: "prodApp.js",
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
	jsonEditorPart1: {
		src: [
			sourceForFiles.devModeFiles.jsonEditorJs.src,
			sourceForFiles.devModeFiles.jsonEditorDialog.src
		],
		dest: sourceForFiles.platformOutputFolder + "jsonEditor",
		taskPath: "./gulptasks/copyFiles"
	},
	jsonEditorPart2: {
		src: [
			sourceForFiles.devModeFiles.jsonEditorCSS.src
		],
		dest: sourceForFiles.platformOutputFolder + "jsonEditor/css/",
		taskPath: "./gulptasks/copyFiles"
	},
	jsonEditorPart3: {
		src: [
			sourceForFiles.devModeFiles.jsonEditorSVG.src
		],
		dest: sourceForFiles.platformOutputFolder + "jsonEditor/css/img",
		taskPath: "./gulptasks/copyFiles"
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
