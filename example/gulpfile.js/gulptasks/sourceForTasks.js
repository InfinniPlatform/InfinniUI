'use strict';
// Необходимо указать путь до платфомы в node_modules
var infinniUIpath = './node_modules/infinni-ui/';

// Путь из infinniUIpath к прикладным стилям
var fromInfinniToNewStylesPath = '/../../styles/';

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
var templateFiles = ["./js/**/*.tpl.html"];

var sourceForTasks = {
	'clean': {
		src: projectFolderForPlatform,
		taskPath: "./gulptasks/clean"
	},
	'build:less': {
		src: "./styles/main.less",
		srcForWatch: "./styles/",
		dest: "./www/compiled/style",
		taskPath: "./gulptasks/buildLess"
	},
	'build:platform-less': {
		src: "./styles/platform/overridden-platform.less",
		srcForWatch: "./styles/platform/",
		dest: "./www/compiled/style",
		taskPath: "./gulptasks/buildLess"
	},
	'copy:platform': {
		src: [infinniUIpath + platformOutputFolder + '**/*.*', '!' + infinniUIpath + platformOutputFolder + 'unitTest.js'],
		dest: projectFolderForPlatform,
		taskPath: "./gulptasks/copyFiles"
	},
	'build:js': {
		src: jsFiles,
		templateSrc: templateFiles,
		finalName: "app.js",
		dest: projectFolderForExtensions,
		taskPath: "./gulptasks/buildJs"
	},
	'server:example': {
		src: "./www",
		// turn it on when develop single page application
		spa: true,
		watch: projectRootFolder + "**/*.*",
		port: 4444,
		ui: {
			port: 4040
		},
		taskPath: "./gulptasks/startServer"
	}
}

module.exports = sourceForTasks;
