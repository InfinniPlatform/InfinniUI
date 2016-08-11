'use strict';

module.exports = function () {
    this.World = require('../support/world.js').World;

    this.When(/^я поменяю значение флага "([^"]*)"$/, function (checkBoxName) {
        checkBoxName = this.helpers.parseElement(checkBoxName);

        var selector = this.selectors.XPATH.CheckBox.self(checkBoxName.name);
        var xpath = this.by.xpath(selector);

        return this.currentView.findElements(xpath)
            .then(function (elements) {
                if(elements.length < checkBoxName.index + 1) {
                    throw new Error('Элемент не найден');
                }
                return elements[checkBoxName.index].click();
            });
    });

    this.When(/^флаг "([^"]*)" будет иметь значение "([^"]*)"$/, function (checkBoxName, value) {
        checkBoxName = this.helpers.parseElement(checkBoxName);
        value = JSON.parse(value);

        var selector = this.selectors.XPATH.CheckBox.self(checkBoxName.name);
        var xpath = this.by.xpath(selector);
        var that = this;

        return this.currentView.findElements(xpath)
            .then(function (elements) {
                if(elements.length < checkBoxName.index + 1) {
                    throw new Error('Элемент не найден');
                }
                return elements[checkBoxName.index].isSelected();
            })
            .then(function (actualValue) {
                that.assert.equal(actualValue, value);
            });
    });
};