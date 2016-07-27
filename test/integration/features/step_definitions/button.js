'use strict';

module.exports = function () {
    this.World = require('../support/world.js').World;

    this.When(/^я нажму на кнопку "([^"]*)"$/, function (buttonText) {
        var button = this.helpers.parseElement(buttonText);

        button.name = this.helpers.fixQuotes(button.name);

        var selector = this.selectors.XPATH.Button.caption(button.name);
        var xpath = this.by.xpath(selector);

        return this.currentView.findElements(xpath).then(function (elements) {
            elements[button.index].click();
        });
    });
};