'use strict';

module.exports = function () {
    this.World = require('../support/world.js').World;

    this.When(/^я введу в поле типа дата "([^"]*)" значение "([^"]*)"$/, function (pickerText, date) {
        var selector = this.selectors.XPATH.DatePicker.caption(pickerText);
        var xpath = this.by.xpath(selector);
        var that = this;

        date = this.helpers.parseDate(date).split('.');

        return this.currentView.findElement(xpath)
            .then(function (label) {
                return label.getAttribute('for');
            })
            .then(function (id) {
                return that.currentView.findElement(that.by.id(id));
            })
            .then(function (input) {
                return input.sendKeys(that.selectAll, that.keys.BACK_SPACE, date);
            });
    });

    this.When(/^значение в поле типа дата "([^"]*)" равно "([^"]*)"$/, function (pickerText, date) {
        var selector = this.selectors.XPATH.DatePicker.caption(pickerText);
        var xpath = this.by.xpath(selector);
        var that = this;

        date = this.helpers.parseDate(date);

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
            .then(function (value) {
                that.assert.equal(value, date);
            });
    });

    this.When(/^я очищу поле типа дата "([^"]*)"$/, function (datePickerLabel) {
        var selector = this.selectors.XPATH.DatePicker.caption(datePickerLabel);
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
                return input.sendKeys(that.selectAll, that.keys.BACK_SPACE);
            });
    });
};