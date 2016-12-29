'use strict';

module.exports = function() {
    this.World = require('../support/world.js').World;

    this.When(/^я введу в текстовое поле "([^"]*)" значение "([^"]*)"$/, function(fieldName, value) {
        value = value.replace(/''/g, '"');
        fieldName = this.helpers.parseElement(fieldName);

        var that = this;
        var selector = this.selectors.XPATH.TextBox.caption(fieldName.name);
        var xpath = this.by.xpath(selector);

        return this.currentView.findElements(xpath)
            .then(function(elements) {
                if (elements.length <= fieldName.index) {
                    throw new Error('Элемент не найден');
                }
                return elements[fieldName.index].sendKeys(that.selectAll, that.keys.BACK_SPACE, value);
            });
    });

    this.When(/^значение в текстовом поле "([^"]*)" равно "([^"]*)"$/, function(textBoxLabel, value) {
        textBoxLabel = this.helpers.parseElement(textBoxLabel);
        value = value.replace(/''/g, '"');

        var selector = this.selectors.XPATH.TextBox.caption(textBoxLabel.name);
        var xpath = this.by.xpath(selector);
        var that = this;

        return this.currentView.findElements(xpath)
            .then(function(elements) {
                if (elements.length <= textBoxLabel.index) {
                    throw new Error('Элемент не найден');
                }
                return elements[textBoxLabel.index].getAttribute('value');
            })
            .then(function(actualValue) {
                that.assert.equal(actualValue, value);
            });
    });
};