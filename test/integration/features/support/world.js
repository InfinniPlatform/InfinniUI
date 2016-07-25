'use strict';

var fs = require('fs');
var webdriver = require('selenium-webdriver');
var selectors = require('../../helpers/selectors.js');
var args = require('../../helpers/config.json');
var helpers = require('../../helpers/helpers.js');
var chai = require('chai');
var underscore = require('underscore');

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

switch (args.platform) {
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
    this.helpers = helpers;
    this.assert = chai.assert;
    this._ = underscore;

    this.currentView = null;

    this.driver.manage().timeouts().implicitlyWait(10000);

    if (!fs.existsSync(screenshotPath)) {
        fs.mkdirSync(screenshotPath);
    }
};

module.exports.World = World;
module.exports.getDriver = getDriver;
