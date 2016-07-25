'use strict';

module.exports = function () {
    this.World = require('../support/world.js').World;

    this.Given(/^я нахожусь на экране "([^"]*)"$/, function (viewName) {
        var that = this;
        return this.driver.findElement(this.by.xpath(this.selectors.XPATH.View.self(viewName))).then(function (element) {
            that.currentView = element;
        });
    });

    this.Then(/^система отобразит экран "([^"]*)"$/, function (viewName) {
        var that = this;
        return this.driver.findElement(this.by.xpath(this.selectors.XPATH.View.self(viewName))).then(function (element) {
            that.currentView = element;
        });
    });

    this.Then(/^система отобразит модальное окно "([^"]*)"$/, function (viewName) {
        var that = this;
        return this.driver.findElement(this.by.xpath(this.selectors.XPATH.ModalView.header(viewName))).then(function (element) {
            that.currentView = element;
        });
    });
};