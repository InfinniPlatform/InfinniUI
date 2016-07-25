'use strict';

module.exports = function () {
    this.World = require('../support/world.js').World;

    this.When(/^я введу в текстовое поле "([^"]*)" значение "([^"]*)"$/, function (fieldName, value) {
        var that = this;
        var selector = this.selectors.XPATH.TextBox.caption(fieldName);
        var xpath = this.by.xpath(selector);

        value = value.replace(/''/g, '"');

        return this.currentView.findElement(xpath).then(function (element) {
            return element.getAttribute('for').then(function (tag) {
                return that.currentView.findElement(that.by.id(tag)).then(function (textbox) {
                    return textbox.sendKeys(value);
                });
            });
        });
    });

    this.When(/^значение в текстовом поле "([^"]*)" равно "([^"]*)"$/, function (textBoxLabel, value) {
        var selector = this.selectors.XPATH.TextBox.caption(textBoxLabel);
        var xpath = this.by.xpath(selector);
        var that = this;

        value = value.replace(/''/g, '"');

        return this.currentView.findElement(xpath).then(function (label) {
            return label.getAttribute('for').then(function (id) {
                return that.currentView.findElement(that.by.id(id)).then(function (textbox) {
                    return textbox.getAttribute('value').then(function (actualValue) {
                        that.assert.equal(actualValue, value);
                    })
                });
            });
        });
    });
};