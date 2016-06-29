'use strict';

module.exports = function () {
    this.World = require('../support/world.js').World;

    this.When(/^я нажму на кнопку "([^"]*)"$/, function (buttonText) {
        return this.driver.findElement(this.by.xpath(this.selectors.XPATH.Button.caption(buttonText))).then(function (element) {
            element.click();
        });
    });
};