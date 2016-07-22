'use strict';

module.exports = function () {
    this.World = require('../support/world.js').World;

    this.Given(/^я нахожусь на экране "([^"]*)"$/, function (viewName) {
        var that = this;
        return this.driver.findElement(this.by.css(this.selectors.CSS.View.self(viewName))).then(function (element) {
            that.currentView = element;
        });
    });

    this.When(/^система отобразит список валидационных сообщений: (.*?)$/, function (messages) {
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
                    if(i == msgs.length - 1) {
                        that.driver.executeScript('$("#toast-container").remove();');
                    }
                });
            });
        });
    });
};