'use strict';

var sourceForFiles = require( './sourceForFiles' );
var arraysForLint = [
    sourceForFiles.jsFiles,
    sourceForFiles.unitTestFiles,
    '!node_modules/**'
];
var forLint = [];

arraysForLint.forEach( function( element ) {
    if( typeof element.forEach === 'function' ) {
        element.forEach( function( item ) {
            forLint.push( item );
        } );
    } else {
        forLint.push( element );
    }
} );

var sourceForTasks = {
    clean: {
        src: [ sourceForFiles.platformOutputFolder, sourceForFiles.packageOutFolder ],
        taskPath: "./gulptasks/clean"
    },
    buildLess: {
        src: sourceForFiles.stylesFiles,
        srcForWatch: sourceForFiles.stylesFilesForWatch,
        finalName: "main.css",
        dest: sourceForFiles.platformOutputFolder + "css/",
        taskPath: "./gulptasks/buildLess"
    },
    'assemble:package': {
        base: sourceForFiles.package.base,
        src: sourceForFiles.package.src,
        dest: sourceForFiles.packageOutFolder,
        taskPath: "./gulptasks/copyFiles"
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
    lint: {
        src: forLint,
        taskPath: "./gulptasks/lint"
    },
    fonts: {
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
};

module.exports = sourceForTasks;
