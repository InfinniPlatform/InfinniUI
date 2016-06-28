'use strict';

module.exports = function () {
    this.World = require('../support/world.js').World;

    this.Given(/^я нахожусь на экране "([^"]*)"$/, function (viewName) {
        return this.driver.findElement(this.by.css(this.selectors.CSS.View.self(viewName)));
    });

    this.When(/^я нажму на кнопку "([^"]*)"$/, function (buttonText) {
        return this.driver.findElement(this.by.xpath(this.selectors.XPATH.Button.caption(buttonText))).then(function (element) {
            element.click();
        });
    });

    this.When(/^я введу в текстовое поле "([^"]*)" значение "([^"]*)"$/, function (fieldName, value) {
        var that = this;
        return this.driver.findElement(this.by.xpath(this.selectors.XPATH.TextBox.caption(fieldName))).then(function (element) {
            return element.getAttribute('for').then(function (tag) {
                return that.driver.findElement(that.by.id(tag)).then(function (textbox) {
                    return textbox.sendKeys(value);
                });
            });
        });
    });
};