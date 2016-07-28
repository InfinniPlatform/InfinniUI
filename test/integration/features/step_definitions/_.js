'use strict';

module.exports = function () {
    this.World = require('../support/world.js').World;

    this.Then(/^система отобразит список валидационных сообщений: (.*?)$/, function (messages) {
        var selector = this.selectors.XPATH.Toastr.messages();
        var xpath = this.by.xpath(selector);
        var that = this;

        messages = this._.map(messages.split('", '), function (item) {
            return item
                .replace(/"/g, '')
                .replace(/''/g, '"');
        });

        return this.driver.findElements(xpath).then(function (msgs) {
            msgs.forEach(function (msg, i) {
                msg.getText().then(function (text) {
                    that.assert.equal(text, messages[i]);
                    if (i == msgs.length - 1) {
                        that.driver.executeScript('$("#toast-container").remove();');
                    }
                });
            });
        });
    });

    this.Then(/^система не отобразит валидационных сообщений$/, function () {
        var selector = this.selectors.XPATH.Toastr.messages();
        var xpath = this.by.xpath(selector);

        return this.driver.findElements(xpath)
            .then(function (msgs) {
                if (msgs.length != 0) {
                    throw new Error('Найдено ' + msgs.length + ' сообщений');
                }
            });
    });

    this.When(/^я увижу элемент "([^"]*)"$/, function (elementName) {
        elementName = this.helpers.parseElement(elementName);

        var selector = this.selectors.XPATH.Element.byName(elementName.name);
        var xpath = this.by.xpath(selector);
        var that = this;

        return this.currentView.findElements(xpath)
            .then(function (elements) {
                return elements[elementName.index].isDisplayed();
            })
            .then(function (value) {
                that.assert.equal(value, true);
            });
    });

    this.When(/^я не увижу элемент "([^"]*)"$/, function (elementName) {
        elementName = this.helpers.parseElement(elementName);

        var selector = this.selectors.XPATH.Element.byName(elementName.name);
        var xpath = this.by.xpath(selector);
        var that = this;

        return this.currentView.findElements(xpath)
            .then(function (elements) {
                return elements[elementName.index].isDisplayed();
            })
            .then(function (value) {
                that.assert.equal(value, false);
            });
    });
};