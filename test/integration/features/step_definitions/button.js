'use strict';

module.exports = function () {
    this.World = require('../support/world.js').World;

    this.When(/^я нажму на кнопку "([^"]*)"$/, function (buttonText) {
        var button = this.helpers.parseElement(buttonText);

        button.name = this.helpers.fixQuotes(button.name);

        var selector = this.selectors.XPATH.Button.caption(button.name);
        var xpath = this.by.xpath(selector);

        return this.currentView.findElements(xpath).then(function (elements) {
            if (elements.length < button.index + 1) {
                throw new Error('Элемент не найден');
            }
            elements[button.index].click();
        });
    });

    this.When(/^я нажму на кнопку "([^"]*)" в выпадающем списке кнопок "([^"]*)"$/, function (buttonText, popupListText) {
        var selector = this.selectors.XPATH.Button.popupCaption(popupListText);
        var xpath = this.by.xpath(selector);
        var that = this;

        return this.currentView.findElement(xpath)
            .then(function (popupList) {
                return popupList.click();
            })
            .then(function () {
                selector = that.selectors.XPATH.Button.popupItem(buttonText);
                xpath = that.by.xpath(selector);

                return that.driver.findElement(xpath);
            })
            .then(function (button) {
                return button.click();
            });
    });

    this.When(/^я не увижу кнопку "([^"]*)" в выпадающем списке кнопок "([^"]*)"$/, function (buttonText, popupListText) {
        var selector = this.selectors.XPATH.Button.popupCaption(popupListText);
        var xpath = this.by.xpath(selector);
        var that = this;

        return this.currentView.findElement(xpath)
            .then(function (popupList) {
                return popupList.click();
            })
            .then(function () {
                selector = that.selectors.XPATH.Button.popupItem(buttonText);
                xpath = that.by.xpath(selector);

                return that.driver.findElements(xpath);
            })
            .then(function (elements) {
                if (elements.length == 0) {
                    throw new Error('Кнопки не существует');
                }
                return elements[0].isDisplayed();
            })
            .then(function (value) {
                that.assert.equal(value, false, 'Кнопка видна');
            });
    });
};
