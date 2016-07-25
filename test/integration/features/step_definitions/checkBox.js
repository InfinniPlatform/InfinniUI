'use strict';

module.exports = function () {
    this.World = require('../support/world.js').World;

    this.When(/^я поменяю значение флага "([^"]*)"$/, function (checkBoxName) {
        checkBoxName = this.helpers.parseElement(checkBoxName);

        var selector = this.selectors.XPATH.CheckBox.self(checkBoxName.name);
        var xpath = this.by.xpath(selector);

        return this.currentView.findElements(xpath)
            .then(function (elements) {
                return elements[checkBoxName.index].click();
            });
    });
};