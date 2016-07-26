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

    this.When(/^я закрою текущее модальное окно$/, function () {
        var selector = this.selectors.XPATH.ModalView.closeButton();
        var xpath = this.by.xpath(selector);
        var that = this;

        return this.driver.findElements(xpath)
            .then(function (elements) {
                var lastModalViewCloseButton = that._.last(elements);
                return lastModalViewCloseButton.click();
            });
    });
};