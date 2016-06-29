'use strict';

module.exports = function () {
    this.World = require('../support/world.js').World;

    this.Given(/^я нахожусь на экране "([^"]*)"$/, function (viewName) {
        var that = this;
        return this.driver.findElement(this.by.css(this.selectors.CSS.View.self(viewName))).then(function (element) {
            that.currentView = element;
        });
    });
};