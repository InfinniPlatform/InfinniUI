'use strict';

var driver = require('./world.js').getDriver();
var fs = require('fs');
var path = require('path');
var sanitize = require("sanitize-filename");
var extensions = require('./extensions.js');

var myHooks = function () {
  
  this.After(function(scenario) {
    if(scenario.isFailed()) {
      this.driver.takeScreenshot().then(function(data){
        var base64Data = data.replace(/^data:image\/png;base64,/,"");
        fs.writeFile(path.join('screenshots', sanitize(scenario.getName() + ".png").replace(/ /g,"_")), base64Data, 'base64', function(err) {
            if(err) console.log(err);
        });
      });
    }
    return this.driver.manage().deleteAllCookies();
  });

  this.registerHandler('AfterFeatures', function (event) {
    return driver.quit();
  });

  this.registerHandler('BeforeFeature', function () {
    return driver.get('http://localhost:8080');
  });

  extensions.call(this);
};

module.exports = myHooks;
