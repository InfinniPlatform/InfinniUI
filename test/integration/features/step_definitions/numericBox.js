'use strict';

module.exports = function () {
    this.World = require('../support/world.js').World;

    this.When(/^значение в числовом поле "([^"]*)" равно "([^"]*)"$/, function (fieldLabel, value) {
        var selector = this.selectors.XPATH.NumericBox.caption(fieldLabel);
        var xpath = this.by.xpath(selector);
        var that = this;

        return this.currentView.findElement(xpath)
            .then(function (label) {
                return label.getAttribute('for');
            })
            .then(function (id) {
                return that.currentView.findElement(that.by.id(id));
            })
            .then(function (input) {
                return input.getAttribute('value');
            })
            .then(function (inputValue) {
                that.assert.equal(inputValue, value);
            });
    });

    this.When(/^я введу в числовое поле "([^"]*)" значение "([^"]*)"$/, function (fieldLabel, value) {
        var selector = this.selectors.XPATH.NumericBox.caption(fieldLabel);
        var xpath = this.by.xpath(selector);
        var that = this;

        return this.currentView.findElement(xpath)
            .then(function (label) {
                return label.getAttribute('for');
            })
            .then(function (id) {
                return that.currentView.findElement(that.by.id(id));
            })
            .then(function (input) {
                return input.sendKeys(that.selectAll, value);
            });
    });

    this.When(/^я увеличу значение в числовом поле "([^"]*)"$/, function (fieldLabel) {
        var selector = this.selectors.XPATH.NumericBox.maxButton(fieldLabel);
        var xpath = this.by.xpath(selector);
        var that = this;

        return this.currentView.findElement(xpath)
            .then(function (maxButton) {
                return maxButton.click();
            });
    });

    this.When(/^я уменьшу значение в числовом поле "([^"]*)"$/, function (fieldLabel) {
        var selector = this.selectors.XPATH.NumericBox.minButton(fieldLabel);
        var xpath = this.by.xpath(selector);
        var that = this;

        return this.currentView.findElement(xpath)
            .then(function (minButton) {
                return minButton.click();
            });
    });
};