'use strict';

module.exports = function () {
    this.World = require('../support/world.js').World;

    this.When(/^значение в числовом поле "([^"]*)" равно "([^"]*)"$/, function (fieldLabel, value) {
        fieldLabel = this.helpers.parseElement(fieldLabel);

        var selector = this.selectors.XPATH.NumericBox.caption(fieldLabel.name);
        var xpath = this.by.xpath(selector);
        var that = this;

        return this.currentView.findElements(xpath)
            .then(function (labels) {
                return labels[fieldLabel.index].getAttribute('for');
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
        fieldLabel = this.helpers.parseElement(fieldLabel);

        var selector = this.selectors.XPATH.NumericBox.caption(fieldLabel.name);
        var xpath = this.by.xpath(selector);
        var that = this;

        return this.currentView.findElements(xpath)
            .then(function (labels) {
                return labels[fieldLabel.index].getAttribute('for');
            })
            .then(function (id) {
                return that.currentView.findElement(that.by.id(id));
            })
            .then(function (input) {
                return input.sendKeys(that.selectAll, value);
            });
    });

    this.When(/^я увеличу значение в числовом поле "([^"]*)"$/, function (fieldLabel) {
        fieldLabel = this.helpers.parseElement(fieldLabel);

        var selector = this.selectors.XPATH.NumericBox.maxButton(fieldLabel.name);
        var xpath = this.by.xpath(selector);
        var that = this;

        return this.currentView.findElements(xpath)
            .then(function (maxButtons) {
                return maxButtons[fieldLabel.index].click();
            });
    });

    this.When(/^я уменьшу значение в числовом поле "([^"]*)"$/, function (fieldLabel) {
        fieldLabel = this.helpers.parseElement(fieldLabel);

        var selector = this.selectors.XPATH.NumericBox.minButton(fieldLabel.name);
        var xpath = this.by.xpath(selector);
        var that = this;

        return this.currentView.findElements(xpath)
            .then(function (minButtons) {
                return minButtons[fieldLabel.index].click();
            });
    });
};