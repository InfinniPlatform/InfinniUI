'use strict';

var fs = require('fs');
var webdriver = require('selenium-webdriver');
var platform = process.env.PLATFORM || "CHROME";
var selectors = require('./selectors.js');

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

switch (platform) {
  case 'FIREFOX':
    var driver = buildFirefoxDriver();
    break;
  case 'PHANTOM':
    var driver = buildPhantomDriver();
    break;
  default:
    var driver = buildFirefoxDriver();
}

var getDriver = function () {
  return driver;
};

var World = function World() {

  var defaultTimeout = 20000;
  var screenshotPath = "screenshots";

  this.webdriver = webdriver;
  this.driver = driver;
  this.by = webdriver.By;
  this.selectors = selectors;

  this.driver.manage().timeouts().implicitlyWait(10000);

  if (!fs.existsSync(screenshotPath)) {
    fs.mkdirSync(screenshotPath);
  }

  this.waitFor = function (cssLocator, timeout) {
    var waitTimeout = timeout || defaultTimeout;
    return driver.wait(function () {
      return driver.isElementPresent({ css: cssLocator });
    }, waitTimeout);
  };
};

module.exports.World = World;
module.exports.getDriver = getDriver;
