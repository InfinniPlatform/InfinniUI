'use strict';

module.exports = function () {
    this.World = require('../support/world.js').World;

    this.Given(/^я нахожусь на экране "([^"]*)"$/, function (viewName) {
        var that = this;
        return this.driver.findElement(this.by.xpath(this.selectors.XPATH.View.self(viewName))).then(function (element) {
            that.currentView = element;
        });
    });

    this.Then(/^система отобразит экран "([^"]*)"$/, function (viewName) {
        var that = this;
        return this.driver.findElement(this.by.xpath(this.selectors.XPATH.View.self(viewName))).then(function (element) {
            that.currentView = element;
        });
    });

    this.Then(/^система отобразит модальное окно "([^"]*)"$/, function (viewName) {
        var that = this;
        return this.driver.findElement(this.by.xpath(this.selectors.XPATH.ModalView.header(viewName))).then(function (element) {
            that.currentView = element;
        });
    });

    this.When(/^я закрою текущее модальное окно$/, function () {
        var selector = this.selectors.XPATH.ModalView.closeButton();
        var xpath = this.by.xpath(selector);
        var that = this;

        return this.driver.findElements(xpath)
            .then(function (elements) {
                var lastModalViewCloseButton = that._.last(elements);
                return lastModalViewCloseButton.click();
            });
    });

    this.Then(/^система отобразит окно-сообщение "([^"]*)"$/, function (message) {
        var selector = this.selectors.XPATH.ModalView.message();
        var xpath = this.by.xpath(selector);
        var that = this;

        message = message.replace(/''/g, '"');

        // TODO: Выполнять без setTimeout
        return this.driver.findElement(xpath).then(function (messageBox) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    messageBox.getText().then(function (text) {
                        text = text.trim();
                        try {
                            that.assert.equal(text, message);
                            resolve();
                        } catch (err) {
                            reject(err);
                        }
                    });
                }, 500);
            });
        });
    });

    this.When(/^я нажму в окне-сообщении на кнопку "([^"]*)"$/, function (buttonText) {
        var selector = this.selectors.XPATH.ModalView.messageBoxButton(buttonText);
        var xpath = this.by.xpath(selector);

        return this.driver.findElement(xpath)
            .then(function (button) {
                return button.click();
            });
    });
};