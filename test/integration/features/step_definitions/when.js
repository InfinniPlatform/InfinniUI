'use strict';

module.exports = function () {
    this.World = require('../support/world.js').World;

    // <editor-fold desc="TextBox">

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

    this.When(/^я введу в поле типа дата "([^"]*)" значение "([^"]*)"$/, function (pickerText, date) {
        var selectorLabel = this.selectors.XPATH.DatePicker.caption(pickerText);
        var selectorEditor = this.selectors.XPATH.DatePicker.editor(pickerText);
        var xpathLabel = this.by.xpath(selectorLabel);
        var xpathEditor = this.by.xpath(selectorEditor);
        var that = this;

        date = this.helpers.parseDate(date);
        console.log(date);

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

    // </editor-fold>

    // <editor-fold desc="ComboBox">

    this.When(/^я выберу в выпадающем списке "([^"]*)" пункт "([^"]*)"$/, function (comboboxLabel, value) {
        var selector = this.selectors.XPATH.ComboBox.caption(comboboxLabel);
        var xpath = this.by.xpath(selector);
        var that = this;

        return this.currentView.findElement(xpath).then(function (element) {
            return element.click().then(function () {
                selector = that.selectors.XPATH.ComboBox.dropDown(value);
                xpath = that.by.xpath(selector);

                return that.driver.findElement(xpath).then(function (dropDownItem) {
                    return dropDownItem.click();
                })
            });
        });
    });

    this.When(/^я выберу в выпадающем списке "([^"]*)" с фильтром "([^"]*)" пункт "([^"]*)"$/, function (comboboxLabel, filter, value) {
        var selector = this.selectors.XPATH.ComboBox.caption(comboboxLabel);
        var xpath = this.by.xpath(selector);
        var that = this;

        return this.currentView.findElement(xpath).then(function (element) {
            return element.click().then(function () {
                selector = that.selectors.XPATH.ComboBox.filter();
                xpath = that.by.xpath(selector);

                return that.driver.findElement(xpath).then(function (filteredField) {
                    return filteredField.sendKeys(filter).then(function () {
                        selector = that.selectors.XPATH.ComboBox.dropDown(value);
                        xpath = that.by.xpath(selector);

                        return that.driver.findElement(xpath).then(function (dropDownItem) {
                            return dropDownItem.click();
                        });
                    });
                });
            });
        });
    });

    // </editor-fold>
};