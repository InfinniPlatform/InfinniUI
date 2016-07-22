'use strict';

module.exports = function () {
    this.World = require('../support/world.js');

    this.When(/^я нажму на панель "([^"]*)"$/, function (panelText) {
        var selector = this.selectors.XPATH.Panel.caption(panelText);
        var xpath = this.by.xpath(selector);

        return this.currentView.findElement(xpath).then(function (panel) {
            return panel.click();
        });
    });
};