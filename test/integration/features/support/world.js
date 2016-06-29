'use strict';

var fs = require('fs');
var webdriver = require('selenium-webdriver');
var platform = process.env.PLATFORM || "CHROME";
var selectors = require('./helpers/selectors.js');
var args = require('./helpers/arguments.js').parse(process.argv.slice(2));

var buildChromeDriver = function () {
    return new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
};

var buildFirefoxDriver = function () {
    return new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.firefox())
        .build();
};

var buildPhantomDriver = function () {
    return new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.phantomjs())
        .build();
};

switch (args.platform || 'firefox') {
    case 'chrome':
        var driver = buildChromeDriver();
        break;
    case 'firefox':
        var driver = buildFirefoxDriver();
        break;
    case 'phantomjs':
        var driver = buildPhantomDriver();
        break;
    default:
        throw new Error('Invalid driver');
}

var getDriver = function () {
    return driver;
};

var World = function World() {
    var screenshotPath = "screenshots";

    this.webdriver = webdriver;
    this.driver = driver;
    this.by = webdriver.By;
    this.selectors = selectors;

    this.currentView = null;

    this.driver.manage().timeouts().implicitlyWait(10000);

    if (!fs.existsSync(screenshotPath)) {
        fs.mkdirSync(screenshotPath);
    }
};

module.exports.World = World;
module.exports.getDriver = getDriver;
