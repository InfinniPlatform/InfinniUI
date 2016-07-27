'use strict';

module.exports = function () {
    this.World = require('../support/world.js').World;

    this.When(/^я введу в текстовое поле "([^"]*)" значение "([^"]*)"$/, function (fieldName, value) {
        value = value.replace(/''/g, '"');
        fieldName = this.helpers.parseElement(fieldName);

        var that = this;
        var selector = this.selectors.XPATH.TextBox.caption(fieldName.name);
        var xpath = this.by.xpath(selector);

        return this.currentView.findElements(xpath).then(function (elements) {
            return elements[fieldName.index].getAttribute('for').then(function (tag) {
                return that.currentView.findElement(that.by.id(tag)).then(function (textbox) {
                    return textbox.sendKeys(that.selectAll, value);
                });
            });
        });
    });

    this.When(/^значение в текстовом поле "([^"]*)" равно "([^"]*)"$/, function (textBoxLabel, value) {
        textBoxLabel = this.helpers.parseElement(textBoxLabel);
        value = value.replace(/''/g, '"');

        var selector = this.selectors.XPATH.TextBox.caption(textBoxLabel.name);
        var xpath = this.by.xpath(selector);
        var that = this;

        return this.currentView.findElements(xpath).then(function (labels) {
            return labels[textBoxLabel.index].getAttribute('for').then(function (id) {
                return that.currentView.findElement(that.by.id(id)).then(function (textbox) {
                    return textbox.getAttribute('value').then(function (actualValue) {
                        that.assert.equal(actualValue, value);
                    })
                });
            });
        });
    });
};