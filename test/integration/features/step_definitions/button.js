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
        var selector = './/div[contains(@class, "pl-popup-button")]//button[contains(@class, "pl-popup-button__button") and node() = "' + popupListText + '"]/../button[contains(@class, "pl-popup-button__grip")]';
        var xpath = this.by.xpath(selector);
        var that = this;

        return this.currentView.findElement(xpath)
            .then(function (btn) {
                selector = '//div[contains(@class, "pl-popup-button__dropdown")]/ul[contains(@class, "pl-popup-button__items")]//a[contains(@class, "pl-button") and node() = "' + buttonText + '"]';
                xpath = that.by.xpath(selector);

                btn.click();

                return that.driver.findElement(xpath);
            })
            .then(function (button) {
                return button.click();
            });
    });
};