'use strict';

var driver = require('./world.js').getDriver();
var by = require('./world.js').By;
var fs = require('fs');
var path = require('path');
var sanitize = require('sanitize-filename');
var args = require('../../helpers/arguments.js')(process.argv.slice(2));
var config = require('./config.json');

var myHooks = function () {

  this.After(function (scenario) {
    if (scenario.isFailed()) {
      this.driver.takeScreenshot().then(function (data) {
        var base64Data = data.replace(/^data:image\/png;base64,/, "");
        fs.writeFile(path.join('screenshots', sanitize(scenario.getName() + ".png").replace(/ /g, "_")), base64Data, 'base64', function (err) {
          if (err) console.log(err);
        });
      });
    }
    return this.driver.manage().deleteAllCookies();
  });

  this.registerHandler('AfterFeatures', function (event) {
    return driver.quit();
  });

  this.registerHandler('BeforeStep', function (step, callback) {
    var attempt = 0;
    var totalAttempts = 10;

    driver.manage().timeouts().implicitlyWait(config.timeouts.wait);

    (function tryContinue(i) {
      driver.findElements(by.xpath('.//div[contains(@class, "blockPage")]'))
          .then(function (elements) {
            if (!elements.length) {
              driver.manage().timeouts().implicitlyWait(config.timeouts.main);
              callback();
            } else {
              if (i < totalAttempts) {
                setTimeout(function () {
                  tryContinue(++i);
                }, 1000);
              } else {
                throw new Error('Блокирование страницы индикатором загрузки более чем на ' + totalAttempts + ' сек.');
              }
            }
          });
    })(1);
  });

  try {
    require('../../helpers/extensions.js').call(this, driver, args);
  } catch (err) {
    console.log('Extensions not found');
  }
};

module.exports = myHooks;
