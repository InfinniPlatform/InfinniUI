'use strict';

var fs = require('fs');
var webdriver = require('selenium-webdriver');
var selectors = require('../../helpers/selectors.js');
var args = require('../../helpers/arguments.js')(process.argv.slice(2));
var helpers = require('../../helpers/helpers.js');
var chai = require('chai');
var underscore = require('underscore');
var config = require('./config.json');

var capabilities = {
    chrome: function() {
        return webdriver.Capabilities.chrome();
    },
    phantomjs: function() {
        var caps = webdriver.Capabilities.phantomjs();

        if (args.phantomjs) {
            caps.set('phantomjs.binary.path', args.phantomjs);
        }

        return caps;
    }
};

var buildChromeDriver = function() {
    return new webdriver.Builder()
        .withCapabilities(capabilities.chrome())
        .build();
};

var buildFirefoxDriver = function() {
    var firefox = require('selenium-webdriver/firefox');
    var profile = new firefox.Profile('C:\\firefoxProfile');
    var options = new firefox.Options().setProfile(profile);

    return new firefox.Driver(options);
};

var buildPhantomDriver = function() {
    return new webdriver.Builder()
        .withCapabilities(capabilities.phantomjs())
        .build();
};

var driver;

(function buildDriver(platform) {
    switch (platform) {
        case 'chrome':
            driver = buildChromeDriver();
            break;
        case 'firefox':
            driver = buildFirefoxDriver();
            break;
        case 'phantomjs':
            driver = buildPhantomDriver();
            break;
        default:
            if (args.platform) {
                throw new Error('Invalid platform "' + (args.platform || '') + '"');
            } else {
                buildDriver(config.browser.platform);
            }
    }
})(args.platform);

var getDriver = function() {
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

    this.driver.manage().timeouts().implicitlyWait(config.timeouts.main);
    this.driver.manage().window().maximize();

    if (!fs.existsSync(screenshotPath)) {
        fs.mkdirSync(screenshotPath);
    }
};

module.exports.World = World;
module.exports.getDriver = getDriver;
module.exports.By = webdriver.By;
