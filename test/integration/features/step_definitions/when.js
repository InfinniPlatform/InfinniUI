'use strict';

module.exports = function () {
    this.World = require('../support/world.js').World;

    // <editor-fold desc="TextBox">

    this.When(/^я введу в текстовое поле "([^"]*)" значение "([^"]*)"$/, function (fieldName, value) {
        var that = this;
        var selector = this.selectors.XPATH.TextBox.caption(fieldName);
        var xpath = this.by.xpath(selector);

        return this.currentView.findElement(xpath).then(function (element) {
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
        var button = this.helpers.parseElement(buttonText);
        var selector = this.selectors.XPATH.Button.caption(button.name);
        var xpath = this.by.xpath(selector);

        return this.currentView.findElements(xpath).then(function (elements) {
            elements[button.index].click();
        });
    });

    // </editor-fold>

    // <editor-fold desc="DatePicker">

    this.When(/^я введу в поле типа дата "([^"]*)" значение "([^"]*)"$/, function (pickerName, date) {

    });

    // </editor-fold>
};