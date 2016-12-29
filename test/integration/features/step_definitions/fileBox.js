'use strict';

module.exports = function() {
    this.World = require('../support/world.js').World;

    this.When(/^я удалю прикрепленный файл из поля "([^"]*)"$/, function(fileBoxName) {
        fileBoxName = this.helpers.parseElement(fileBoxName);

        var selector = this.selectors.XPATH.FileBox.caption(fileBoxName.name);
        var xpath = this.by.xpath(selector);

        return this.currentView.findElements(xpath)
            .then(function(element) {
                if (element.length <= fileBoxName.index) {
                    throw new Error('Элемент не найден');
                }

                var selector = this.selectors.XPATH.FileBox.removeButton();
                var xpath = this.by.xpath(selector);

                return element[fileBoxName.index].findElement(xpath);
            }.bind(this))
            .then(function(button) {
                return button.click();
            });
    });
};
