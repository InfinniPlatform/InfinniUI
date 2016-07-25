'use strict';

module.exports = function () {
    this.World = require('../support/world.js').World;

    this.Then(/^система отобразит список валидационных сообщений: (.*?)$/, function (messages) {
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
};