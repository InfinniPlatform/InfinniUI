'use strict';

module.exports = function () {
    this.World = require('../support/world.js').World;

    this.When(/^я выберу в выпадающем списке "([^"]*)" значение "([^"]*)"$/, function (comboBoxLabel, value) {
        comboBoxLabel = this.helpers.parseElement(comboBoxLabel);
        comboBoxLabel.name = this.helpers.fixQuotes(comboBoxLabel.name);
        value = this.helpers.fixQuotes(value);

        var selector = this.selectors.XPATH.ComboBox.button(comboBoxLabel.name);
        var xpath = this.by.xpath(selector);
        var that = this;

        return this.currentView.findElements(xpath).then(function (elements) {
            return elements[comboBoxLabel.index].click().then(function () {
                selector = that.selectors.XPATH.ComboBox.dropDown(value);
                xpath = that.by.xpath(selector);

                return that.driver.findElement(xpath).then(function (dropDownItem) {
                    return dropDownItem.click();
                })
            });
        });
    });

    this.When(/^я выберу в выпадающем списке "([^"]*)" с фильтром "([^"]*)" значение "([^"]*)"$/, function (comboBoxLabel, filter, value) {
        comboBoxLabel = this.helpers.parseElement(comboBoxLabel);
        comboBoxLabel.name = this.helpers.fixQuotes(comboBoxLabel.name);
        value = this.helpers.fixQuotes(value);

        var selector = this.selectors.XPATH.ComboBox.button(comboBoxLabel.name);
        var xpath = this.by.xpath(selector);
        var that = this;

        return this.currentView.findElements(xpath).then(function (elements) {
            return elements[comboBoxLabel.index].click().then(function () {
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

    this.When(/^значение в выпадающем списке "([^"]*)" равно "([^"]*)"$/, function (comboBoxLabel, value) {
        comboBoxLabel = this.helpers.parseElement(comboBoxLabel);
        comboBoxLabel.name = this.helpers.fixQuotes(comboBoxLabel.name);
        value = value.replace(/''/g, '"');

        var selector = this.selectors.XPATH.ComboBox.caption(comboBoxLabel.name);
        var xpath = this.by.xpath(selector);
        var that = this;
        
        return this.currentView.findElements(xpath).then(function (labels) {
            return labels[comboBoxLabel.index].getAttribute('for').then(function (id) {
                return that.currentView.findElement(that.by.id(id)).then(function (control) {
                    selector = that.selectors.XPATH.ComboBox.value();
                    xpath = that.by.xpath(selector);

                    return control.findElement(xpath).then(function (comboBoxValue) {
                        return comboBoxValue.getText().then(function (text) {
                            that.assert.equal(text, value);
                        });
                    });
                });
            });
        });
    });
};