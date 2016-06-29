'use strict';

module.exports = function () {
    this.World = require('../support/world.js').World;

    // <editor-fold desc="TextBox">

    this.When(/^я введу в текстовое поле "([^"]*)" значение "([^"]*)"$/, function (fieldName, value) {
        var that = this;
        return this.currentView.findElement(this.by.xpath(this.selectors.XPATH.TextBox.caption(fieldName))).then(function (element) {
            return element.getAttribute('for').then(function (tag) {
                return that.currentView.findElement(that.by.id(tag)).then(function (textbox) {
                    return textbox.sendKeys(value);
                });
            });
        });
    });

    // </editor-fold>

    // <editor-fold desc="Button">

    this.When(/^я нажму на кнопку "([^"]*)"$/, function (buttonText) {
        return that.currentView.findElement(that.by.xpath(that.selectors.XPATH.Button.caption(buttonText))).then(function (element) {
            element.click();
        });
    });

    // </editor-fold>
};