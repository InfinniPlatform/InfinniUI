'use strict';

var fs = require('fs');
var webdriver = require('selenium-webdriver');
var selectors = require('../../helpers/selectors.js');
var args = require('../../helpers/arguments.js')(process.argv.slice(2));
var helpers = require('../../helpers/helpers.js');
var chai = require('chai');
var underscore = require('underscore');

var capabilities = {
    chrome: function () {
        return webdriver.Capabilities.chrome();
    },
    firefox: function () {
        return webdriver.Capabilities.firefox();
    },
    phantomjs: function () {
        var caps = webdriver.Capabilities.phantomjs();

        if(args.phantomjs) {
            caps.set('phantomjs.binary.path', args.phantomjs);
        }

        return caps;
    }
};

var buildChromeDriver = function () {
    return new webdriver.Builder()
        .withCapabilities(capabilities.chrome())
        .build();
};

var buildFirefoxDriver = function () {
    return new webdriver.Builder()
        .withCapabilities(capabilities.firefox())
        .build();
};

var buildPhantomDriver = function () {
    return new webdriver.Builder()
        .withCapabilities(capabilities.phantomjs())
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
        throw new Error('Invalid driver "' + (args.platform || '') + '"');
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
    this.keys = webdriver.Key;
    this.selectAll = this.keys.chord(this.keys.CONTROL, 'a');

    this.currentView = null;

    this.driver.manage().timeouts().implicitlyWait(10000);
    this.driver.manage().window().setSize(1600, 900);

    if (!fs.existsSync(screenshotPath)) {
        fs.mkdirSync(screenshotPath);
    }
};

module.exports.World = World;
module.exports.getDriver = getDriver;
