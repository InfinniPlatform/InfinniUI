'use strict';

module.exports = function () {
    this.World = require('../support/world.js').World;

    this.When(/^я введу в поле типа дата "([^"]*)" значение "([^"]*)"$/, function (pickerText, date) {
        var selectorLabel = this.selectors.XPATH.DatePicker.caption(pickerText);
        var selectorEditor = this.selectors.XPATH.DatePicker.editor(pickerText);
        var xpathLabel = this.by.xpath(selectorLabel);
        var xpathEditor = this.by.xpath(selectorEditor);
        var that = this;

        date = this.helpers.parseDate(date);

        // TODO: Сделать метод более уникальным, чем три отправки
        return this.currentView.findElement(xpathLabel).then(function (element) {
            return element.sendKeys('').then(function () {
                return that.currentView.findElement(xpathEditor).then(function (editor) {
                    date = date.split('.');
                    return editor.sendKeys(date[0]).then(function () {
                        return editor.sendKeys(date[1]).then(function () {
                            return editor.sendKeys(date[2]);
                        });
                    });
                });
            });
        });
    });

    this.When(/^значение в поле типа дата "([^"]*)" равно "([^"]*)"$/, function (pickerText, date) {
        var selector = this.selectors.XPATH.DatePicker.control(pickerText);
        var xpath = this.by.xpath(selector);
        var that = this;

        date = this.helpers.parseDate(date);

        return this.currentView.findElement(xpath).then(function (datePicker) {
            return datePicker.getAttribute('value').then(function (value) {
                that.assert.equal(value, date);
            });
        });
    });
};