'use strict';

module.exports = function () {
    this.World = require('../support/world.js').World;

    this.When(/^я нажму на кнопку "([^"]*)"$/, function (buttonText) {
        buttonText = this.helpers.fixQuotes(buttonText);

        var button = this.helpers.parseElement(buttonText);
        var selector = this.selectors.XPATH.Button.caption(button.name);
        var xpath = this.by.xpath(selector);

        return this.currentView.findElements(xpath).then(function (elements) {
            elements[button.index].click();
        });
    });
};